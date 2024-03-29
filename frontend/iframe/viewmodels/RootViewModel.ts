import { ForcedLogoutViewModel } from "hydrogen-web/src/domain/ForcedLogoutViewModel";
import { LoginViewModel } from "hydrogen-web/src/domain/login/LoginViewModel";
import { LogoutViewModel } from "hydrogen-web/src/domain/LogoutViewModel";
import { SegmentType } from "hydrogen-web/src/domain/navigation";
import { UnknownRoomViewModel } from "hydrogen-web/src/domain/session/room/UnknownRoomViewModel";
import { SessionLoadViewModel } from "hydrogen-web/src/domain/SessionLoadViewModel";
import { SessionPickerViewModel } from "hydrogen-web/src/domain/SessionPickerViewModel";
import { Options as BaseOptions, ViewModel } from "hydrogen-web/src/domain/ViewModel";
import { Client } from "hydrogen-web/src/matrix/Client.js";
import { HomeServerApi } from "hydrogen-web/src/matrix/net/HomeServerApi";
import { lookupHomeserver } from "hydrogen-web/src/matrix/well-known";
import { allSections, Section } from "../platform/Navigation";
import { Platform } from "../platform/Platform";
import { SessionViewModel } from "./SessionViewModel";

type Options = {} & BaseOptions;

export class RootViewModel extends ViewModel<SegmentType, Options> {
    private _error: Error | undefined;
    private _loginViewModel: LoginViewModel | undefined;
    private _logoutViewModel: LogoutViewModel | undefined;
    private _forcedLogoutViewModel: ForcedLogoutViewModel | undefined;
    private _sessionPickerViewModel: SessionPickerViewModel | undefined;
    private _sessionLoadViewModel: SessionLoadViewModel | undefined;
    private _sessionViewModel: SessionViewModel | undefined;
    private _unknownRoomViewModel: UnknownRoomViewModel | undefined;
    private _pendingClient: Client;
    private readonly _singleRoomIdOrAlias: string | undefined;
    private _resolvedSingleRoomId: string | null | undefined = undefined;

    constructor(options: Options) {
        super(options);
        this._singleRoomIdOrAlias = this.platform.config.roomId;
    }

    public get activeSection(): Section {
        if (this._error) {
            return Section.Error;
        } else if (this._loginViewModel) {
            return Section.Login;
        } else if (this._logoutViewModel) {
            return Section.Logout;
        } else if (this._forcedLogoutViewModel) {
            return Section.ForcedLogout;
        } else if (this._sessionPickerViewModel) {
            return Section.SessionPicker;
        } else if (this._sessionLoadViewModel) {
            return Section.SessionLoading;
        } else if (this._sessionViewModel) {
            return Section.Session;
        } else if (this._unknownRoomViewModel) {
            return Section.UnknownRoom;
        } else {
            return Section.Redirecting;
        }
    }

    public get loginViewModel(): LoginViewModel | undefined {
        return this._loginViewModel;
    }

    public get logoutViewModel(): LogoutViewModel | undefined {
        return this._logoutViewModel;
    }

    public get forcedLogoutViewModel(): ForcedLogoutViewModel | undefined {
        return this._forcedLogoutViewModel;
    }

    public get sessionPickerViewModel(): SessionPickerViewModel | undefined {
        return this._sessionPickerViewModel;
    }

    public get sessionLoadViewModel(): SessionLoadViewModel | undefined {
        return this._sessionLoadViewModel;
    }

    public get unknownRoomViewModel(): UnknownRoomViewModel | undefined {
        return this._unknownRoomViewModel;
    }

    public get sessionViewModel(): SessionViewModel | undefined {
        return this._sessionViewModel;
    }

    public get error(): Error | undefined {
        return this._error;
    }

    public get singleRoomMode(): boolean {
        return !!this._singleRoomIdOrAlias;
    }

    public async start() {
        allSections().forEach((section: Section) => {
            // @ts-ignore
            this.track(this.navigation.observe(section).subscribe(() => void this._applyNavigation(false)));
        });

        this.track(this.navigation.observe("sso").subscribe(() => void this._applyNavigation(false)));

        return this._applyNavigation(true);
    }

    private async _applyNavigation(shouldRestoreLastUrl: boolean) {
        const isLogin = this.navigation.path.get("login");
        const logoutSessionId = this.navigation.path.get("logout")?.value;
        const isForcedLogout = this.navigation.path.get("forced")?.value;
        const loginToken = this.navigation.path.get("sso")?.value;

        let sessionId = this.navigation.path.get("session")?.value;
        if (sessionId === true) {
            // When logging out, we end up here (sessionId = true).
            // Since user is now logged out and as there can only be a single session,
            // we want to show the login screen directly.
            sessionId = null;
        }

        if (isLogin) {
            if (this.activeSection !== Section.Login) {
                this._showLogin(undefined);
            }
        } else if (logoutSessionId && isForcedLogout) {
            if (this.activeSection !== Section.ForcedLogout) {
                this._showForcedLogout(logoutSessionId);
            }
        } else if (logoutSessionId) {
            if (this.activeSection !== Section.Logout) {
                this._showLogout(logoutSessionId);
            }
        } else if (sessionId) {
            const singleRoomId = await this.getSingleRoomId();
            if (singleRoomId) {
                this.navigation.push("room", singleRoomId);
            }

            if (!this._sessionViewModel || this._sessionViewModel.id !== sessionId) {
                // See _showLogin for where _pendingClient comes from.
                if (this._pendingClient && this._pendingClient.sessionId === sessionId) {
                    const client = this._pendingClient;
                    this._pendingClient = null;
                    await this._showSession(client);
                } else {
                    // This should never happen, but we want to be sure not to leak it.
                    if (this._pendingClient) {
                        this._pendingClient.dispose();
                        this._pendingClient = null;
                    }
                    await this._showSessionLoader(sessionId);
                }
            }
        } else if (loginToken) {
            this.urlRouter.normalizeUrl();
            if (this.activeSection !== Section.Login) {
                this._showLogin(loginToken);
            }
        } else {
            try {
                await this._showInitialScreen();
            } catch (err) {
                console.error(err);
                this._setSection(() => this._error = err);
            }
        }
    }

    private async _showInitialScreen() {
        let sessionInfos = await this.platform.sessionInfoStorage.getAll();

        // In previous versions, it was possible to have multiple sessions open.
        // When we have multiple sessions, we want to log out all of them except one.
        if (sessionInfos.length > 1) {
            for (let i = 0; i < sessionInfos.length - 1; i++) {
                await this.platform.sessionInfoStorage.delete(sessionInfos[i].id);
            }

            sessionInfos = await this.platform.sessionInfoStorage.getAll();
            if (sessionInfos.length > 1) {
                console.error("Expected to have a single session, but multiple sessions were found.");
            }
        }

        // Only restore last url if there is already a session.
        // This will result in the user being sent to login screen.
        let shouldRestoreLastUrl = sessionInfos.length > 1;

        // We never want to show the session picker, even if it was the last url.
        const willShowSessionPicker = this.platform.history.getLastSessionUrl() === "#/session";
        if (willShowSessionPicker) {
            shouldRestoreLastUrl = false;
        }

        if (shouldRestoreLastUrl && this.urlRouter.tryRestoreLastUrl()) {
            // Restored last URL.
            // By the time we get here, _applyNavigation() has run for the restored URL, so we have nothing else to do.
            return;
        }

        // We were not able to restore the last URL.
        // So we send the user to the screen that makes the most sense, according to how many sessions they have.

        if (sessionInfos.length === 1) {
            this.navigation.push(Section.Session, sessionInfos[0].id);
            return;
        }

        this.navigation.push(Section.Login);
    }

    private async resolveRoomAlias(roomIdOrAlias: string): Promise<string> {
        if (roomIdOrAlias.startsWith('!')) {
            return roomIdOrAlias;
        }

        const homeserver = await lookupHomeserver(roomIdOrAlias.split(':')[1], this.platform.request);
        const homeserverApi = new HomeServerApi({
            homeserver: homeserver,
            request: this.platform.request,
            accessToken: "",
            reconnector: this.platform.reconnector,
        });

        let response = await homeserverApi.resolveRoomAlias(roomIdOrAlias).response();
        return response.room_id;
    }

    private _showLogin(loginToken: string | undefined) {
        this._setSection(() => {
            const options = this.childOptions({
                defaultHomeserver: this.platform.config.defaultHomeserver,
                ready: client => {
                    // We don't want to load the session container again, but we do want the change offscreen to go
                    // through the navigation, so we store the session container in a temporary variable that will be
                    // consumed by _applyNavigation, triggered by the navigation change.
                    //
                    // Also, we should not call _setSection before the navigation is in the correct state,
                    // as url creation (e.g. in RoomTileViewModel) won't be using the correct navigation base path.
                    this._pendingClient = client;
                    this.navigation.push("session", client.sessionId);
                },
                loginToken: loginToken,
            });

            this._loginViewModel = new LoginViewModel(options);
        });
    }

    private _showLogout(sessionId: string) {
        this._setSection(() => {
            this._logoutViewModel = new LogoutViewModel(this.childOptions({ sessionId }));
        });
    }

    private _showForcedLogout(sessionId: string) {
        this._setSection(() => {
            this._forcedLogoutViewModel = new ForcedLogoutViewModel(this.childOptions({ sessionId }));
        });
    }

    private async _showPicker() {
        this._setSection(() => {
            this._sessionPickerViewModel = new SessionPickerViewModel(this.childOptions({}));
        });
        try {
            await this._sessionPickerViewModel.load();
        } catch (err) {
            this._setSection(() => this._error = err);
        }
    }

    private async _showSessionLoader(sessionId: string) {
        const client = new Client(this.platform, this.features);
        await client.startWithExistingSession(sessionId);

        this._setSection(() => {
            this._sessionLoadViewModel = new SessionLoadViewModel(this.childOptions({
                client,
                ready: client => this._showSession(client)
            }));
            this._sessionLoadViewModel.start();
        });
    }

    private async _showSession(client: Client) {
        const singleRoomId = await this.getSingleRoomId();
        this._setSection(() => {
            this._sessionViewModel = new SessionViewModel(this.childOptions({
                client,
                singleRoomId,
            }));
            this._sessionViewModel.start();
        });
    }

    private _setSection(setter: Function) {
        // Clear all members the activeSection depends on.
        this._error = undefined;
        this._sessionPickerViewModel = this.disposeTracked(this._sessionPickerViewModel);
        this._sessionLoadViewModel = this.disposeTracked(this._sessionLoadViewModel);
        this._loginViewModel = this.disposeTracked(this._loginViewModel);
        this._logoutViewModel = this.disposeTracked(this._logoutViewModel);
        this._forcedLogoutViewModel = this.disposeTracked(this._forcedLogoutViewModel);
        this._sessionViewModel = this.disposeTracked(this._sessionViewModel);
        // Now set it again.
        setter();
        this._sessionPickerViewModel && this.track(this._sessionPickerViewModel);
        this._sessionLoadViewModel && this.track(this._sessionLoadViewModel);
        this._loginViewModel && this.track(this._loginViewModel);
        this._logoutViewModel && this.track(this._logoutViewModel);
        this._forcedLogoutViewModel && this.track(this._forcedLogoutViewModel);
        this._sessionViewModel && this.track(this._sessionViewModel);
        this.emitChange("activeSection");
    }

    private async getSingleRoomId(): Promise<string|null> {
        if (!this._singleRoomIdOrAlias || this._singleRoomIdOrAlias === "") {
            return null;
        }

        if (this._resolvedSingleRoomId === undefined) {
            try {
                this._resolvedSingleRoomId = await this.resolveRoomAlias(this._singleRoomIdOrAlias);
            } catch (error) {
                // Something went wrong when resolving the room alias.
                // We swallow the error and fallback to non-single-room mode.
                console.warn(error);
                this._resolvedSingleRoomId = null;
            }
        }

        return this._resolvedSingleRoomId;
    }

    public get platform(): Platform {
        return super.platform;
    }
}
