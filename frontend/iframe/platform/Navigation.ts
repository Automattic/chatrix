import { createNavigation as baseCreateNavigation, SegmentType } from "hydrogen-web/src/domain/navigation";
import { Navigation as BaseNavigation } from "hydrogen-web/src/domain/navigation/Navigation";

export enum Section {
    Login = "login",
    Logout = "logout",
    ForcedLogout = "forced-logout",
    SessionPicker = "picker",
    SessionLoading = "loading",
    Session = "session",
    Error = "error",
    UnknownRoom = "unknown-room",
    Redirecting = "redirecting",
}

export function allSections(): (Section)[] {
    return Object.values(Section);
}

export function createNavigation(): Navigation {
    return baseCreateNavigation();
}

export class Navigation extends BaseNavigation<SegmentType> {
}
