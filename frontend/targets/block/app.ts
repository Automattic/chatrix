import { Main } from "../../main";
import { AppViewModelMaker } from "../../viewmodels/AppViewModel";
import { AppViewMaker } from "../../views/AppView";
import { AppView } from "./AppView";
import { AppViewModel } from "./AppViewModel";

const appViewModelMaker: AppViewModelMaker = (options: any) => {
    return new AppViewModel(options);
};

const appViewMaker: AppViewMaker = (viewModel: AppViewModel) => {
    return new AppView(viewModel);
};

const main = new Main("chatrix-block");
main.start(appViewModelMaker, appViewMaker).catch((error) => {
    throw new Error("Failed to start app: " + error);
});
