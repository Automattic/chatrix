export interface IConfig {
    /**
     * The default homeserver used by Hydrogen; auto filled in the login UI.
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
}
