import { Navigation as BaseNavigation, Segment } from "hydrogen-web/src/domain/navigation/Navigation";
import { SegmentType } from "hydrogen-web/src/domain/navigation";

export enum Section {
    Loading = "loading",
    Login = "login",
    App = "app",
}

export class Navigation extends BaseNavigation<SegmentType> {
    constructor() {
        super(allowsChild);
    }
}

function allowsChild(parent: Segment<SegmentType> | undefined, child: Segment<SegmentType>): boolean {
    const allowed = [
        Section.Loading,
        Section.Login,
        Section.App,
    ];

    const { type } = child;
    switch (parent?.type) {
        case undefined:
            return allowed.includes(type);
        default:
            return false;
    }
}
