import { createRouter, Navigation, Options, Platform, ViewModel } from "hydrogen-view-sdk";

type Options = { platform: typeof Platform, navigation: typeof Navigation, urlCreator: ReturnType<typeof createRouter> };

export enum Section {
    Boot = "boot",
    Login = "login",
}

export class RootViewModel extends ViewModel {
    private _activeSection: Section;

    constructor(options: Options) {
        super(options);
        this._activeSection = Section.Boot;
        this.setupNavigation();
    }

    public get activeSection(): Section {
        return this._activeSection
    }

    private set activeSection(section: Section) {
        this._activeSection = section;
        this.emitChange("activeSection");
    }

    public async start() {
        this.navigation.push(Section.Login);
    }

    private setupNavigation() {
        this.navigation.observe(Section.Login).subscribe(() => this.showLogin());
    }

    private showLogin() {
        this.activeSection = Section.Login;
    }
}
