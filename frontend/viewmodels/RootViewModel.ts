import { AppViewModel, AppViewModelMaker } from "./AppViewModel";
import { Section } from "../main";
import { Options as BaseOptions, ViewModel } from "./ViewModel";
import { LoginViewModel } from "./LoginViewModel";
import { IConfig } from "../config";

type Options = {
    config: IConfig,
    appViewModelMaker: AppViewModelMaker,
} & BaseOptions;

export class RootViewModel extends ViewModel {
    private _config: IConfig;
    private _activeSection: Section;
    private _loginViewModel: LoginViewModel | null;
    private _appViewModel: AppViewModel | null;
    private readonly _appViewModelMaker: AppViewModelMaker;

    constructor(options: Options) {
        super(options);
        this._config = options.config;
        this._activeSection = Section.Loading;
        this._loginViewModel = null;
        this._appViewModel = null;
        this._appViewModelMaker = options.appViewModelMaker;
        this.setupNavigation();
    }

    public get activeSection(): Section {
        return this._activeSection
    }

    private set activeSection(section: Section) {
        this._activeSection = section;
        this.emitChange("activeSection");
    }

    public get appViewModel(): AppViewModel | null {
        return this._appViewModel;
    }

    public get loginViewModel(): LoginViewModel | null {
        return this._loginViewModel;
    }

    public async start() {
        this.navigation.push(Section.App);

        return Promise.resolve();
    }

    private setupNavigation() {
        this.navigation.observe(Section.Login).subscribe(() => this.showLogin());
        this.navigation.observe(Section.App).subscribe(() => this.showApp());
    }

    private showLogin() {
        this._loginViewModel = this.track(new LoginViewModel(
            this.childOptions({
                platform: this.platform,
                defaultHomeserver: this._config.homeserver ?? "",
            }))
        );
        this.activeSection = Section.Login;
    }

    private showApp() {
        this._appViewModel = this.track(this._appViewModelMaker(
            this.childOptions({
                platform: this.platform,
            })
        ));
        this.activeSection = Section.App;
    }
}
