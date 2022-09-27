import { createRouter, Navigation, Options, Platform, ViewModel } from "hydrogen-view-sdk";
import { LoginViewModel } from "./LoginViewModel";

type Options = { platform: typeof Platform, navigation: typeof Navigation, urlCreator: ReturnType<typeof createRouter> };

export enum Section {
    Loading = "loading",
    Login = "login",
}

export class RootViewModel extends ViewModel {
    private _activeSection: Section;
    private _loginViewModel: LoginViewModel | null;

    constructor(options: Options) {
        super(options);
        this._activeSection = Section.Loading;
        this._loginViewModel = null;
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

    public get loginViewModel(): LoginViewModel | null {
        return this._loginViewModel;
    }

    private showLogin() {
        this._loginViewModel = this.track(new LoginViewModel(
            this.childOptions({
                client: this._client,
                state: this._state,
                platform: this.platform,
            })
        ));
        this.activeSection = Section.Login;
    }
}
