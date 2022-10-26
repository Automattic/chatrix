export interface IConfig {
    /**
     * The default homeserver used by Hydrogen; autofilled in the login UI.
     * eg: https://matrix.org
     */
    defaultHomeserver: string;

    /**
     * Paths to theme-manifests
     * eg: ["assets/theme-element.json", "assets/theme-awesome.json"]
     */
    themeManifests: string[];

    /**
     * This configures the default theme(s) used by Hydrogen.
     * These themes appear as "Default" option in the theme chooser UI and are also
     * used as a fallback when other themes fail to load.
     * Whether the dark or light variant is used depends on the system preference.
     */
    defaultTheme: {
        // id of light theme
        light: string;
        // id of dark theme
        dark: string;
    };

    /**
     * When a roomId is set, client will be in single-room mode.
     * In this mode, the client opens directly in that room, with the user not having access to the screen that shows the list of rooms.
     * The room must be public, so that the user can join without requiring an invitation.
     * The roomId must be the room's actual id, it must not be an alias.
     * Example: !abc123:example.com
     */
    roomId?: string;
}
