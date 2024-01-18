import { IConfig } from "./IConfig";

export class ConfigFactory {
    public static fromQueryParams(): IConfig {
        const params = new URLSearchParams(window.location.search);
        const getQueryParam = (name: string) => {
            let param = params.get(name);
            if (!param || param === "") {
                param = null;
            }
            return param;
        };

        let enableServiceWorker = true;
        const enableServiceWorkerParam = getQueryParam("enableServiceWorker");
        if (enableServiceWorkerParam) {
            if (enableServiceWorkerParam === "true") {
                enableServiceWorker = true;
            } else if (enableServiceWorkerParam === "false") {
                enableServiceWorker = false;
            }
        }

        return {
            instanceId: getQueryParam("instanceId") ?? "",
            defaultHomeserver: getQueryParam("defaultHomeserver") ?? "",
            roomId: getQueryParam("roomId") ?? "",
            enableServiceWorker,
            themeManifests: [
                new URL("assets/theme-chatrix.json", import.meta.url).href,
            ],
            defaultTheme: {
                light: "chatrix",
                dark: "chatrix",
            },
        };
    }
}
