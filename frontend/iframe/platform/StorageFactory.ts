/*
Copyright 2020 Bruno Windels <bruno@windels.cloud>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { ILogItem } from "hydrogen-web/src/logging/types";
import { Export, exportSession, importSession } from "hydrogen-web/src/matrix/storage/idb/export";
import { detectWebkitEarlyCloseTxnBug } from "hydrogen-web/src/matrix/storage/idb/quirks";
import { schema } from "hydrogen-web/src/matrix/storage/idb/schema";
import { Storage } from "hydrogen-web/src/matrix/storage/idb/Storage";
import { clearKeysFromLocalStorage } from "hydrogen-web/src/matrix/storage/idb/stores/SessionStore";
import { IDOMStorage } from "hydrogen-web/src/matrix/storage/idb/types";
import { openDatabase, reqAsPromise } from "hydrogen-web/src/matrix/storage/idb/utils";

// This file is the same as hydrogen-web/src/matrix/storage/idb/StorageFactory.ts.
// The only change we've made is to make the following function use the prefix "chatrix" instead of "hydrogen".
const sessionName = (sessionId: string) => `chatrix_session_${sessionId}`;

const openDatabaseWithSessionId = function(sessionId: string, idbFactory: IDBFactory, localStorage: IDOMStorage, log: ILogItem) {
    const create = (db, txn, oldVersion, version) => createStores(db, txn, oldVersion, version, localStorage, log);
    return openDatabase(sessionName(sessionId), create, schema.length, idbFactory);
};

interface ServiceWorkerHandler {
    preventConcurrentSessionAccess: (sessionId: string) => Promise<void>;
}

async function requestPersistedStorage(): Promise<boolean> {
    // don't assume browser so we can run in node with fake-idb
    const glob = this;
    if (glob?.navigator?.storage?.persist) {
        return await glob.navigator.storage.persist();
    } else if (glob?.document.requestStorageAccess) {
        try {
            await glob.document.requestStorageAccess();
            return true;
        } catch (err) {
            console.warn("requestStorageAccess threw an error:", err);
            return false;
        }
    } else {
        return false;
    }
}

export class StorageFactory {
    private _serviceWorkerHandler: ServiceWorkerHandler;
    private _runSyncInWorker: boolean;
    private _idbFactory: IDBFactory;
    private _IDBKeyRange: typeof IDBKeyRange;
    private _localStorage: IDOMStorage;

    constructor(serviceWorkerHandler: ServiceWorkerHandler, runSyncInWorker: boolean = false, idbFactory: IDBFactory = self.indexedDB, _IDBKeyRange = self.IDBKeyRange, localStorage: IDOMStorage = self.localStorage) {
        this._serviceWorkerHandler = serviceWorkerHandler;
        this._idbFactory = idbFactory;
        this._IDBKeyRange = _IDBKeyRange;
        this._localStorage = localStorage;
    }

    async create(sessionId: string, log: ILogItem): Promise<Storage> {
        // When sync is running in a worker, we do not need to prevent concurrent session access.
        if (!this._runSyncInWorker) {
            await this._serviceWorkerHandler?.preventConcurrentSessionAccess(sessionId);
        }
        void requestPersistedStorage().then(persisted => {
            // Firefox lies here though, and returns true even if the user denied the request
            if (!persisted) {
                console.warn("no persisted storage, database can be evicted by browser");
            }
        });

        const hasWebkitEarlyCloseTxnBug = await detectWebkitEarlyCloseTxnBug(this._idbFactory);
        const db = await openDatabaseWithSessionId(sessionId, this._idbFactory, this._localStorage, log);
        return new Storage(db, this._idbFactory, this._IDBKeyRange, hasWebkitEarlyCloseTxnBug, this._localStorage, log.logger);
    }

    delete(sessionId: string): Promise<IDBDatabase> {
        const databaseName = sessionName(sessionId);
        clearKeysFromLocalStorage(this._localStorage, databaseName);
        const req = this._idbFactory.deleteDatabase(databaseName);
        return reqAsPromise(req);
    }

    async export(sessionId: string, log: ILogItem): Promise<Export> {
        const db = await openDatabaseWithSessionId(sessionId, this._idbFactory, this._localStorage, log);
        return await exportSession(db);
    }

    async import(sessionId: string, data: Export, log: ILogItem): Promise<void> {
        const db = await openDatabaseWithSessionId(sessionId, this._idbFactory, this._localStorage, log);
        return await importSession(db, data);
    }
}

async function createStores(db: IDBDatabase, txn: IDBTransaction, oldVersion: number | null, version: number, localStorage: IDOMStorage, log: ILogItem): Promise<void> {
    const startIdx = oldVersion || 0;
    return log.wrap(
        { l: "storage migration", oldVersion, version },
        async (log) => {
            for (let i = startIdx; i < version; ++i) {
                const migrationFunc = schema[i];
                await log.wrap(`v${i + 1}`, (log) => migrationFunc(db, txn, localStorage, log));
            }
        });
}
