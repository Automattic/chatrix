import { prefix } from "../../../parent/util";

export type ClickHandler = () => void;

export class StartButton {
    private readonly clickHandler: ClickHandler;
    private readonly button: HTMLButtonElement;

    constructor(clickHandler: ClickHandler) {
        this.clickHandler = clickHandler;
        this.button = document.createElement("button");
        this.button.className = prefix("start-button");
        this.button.onclick = () => {
            this.clicked();
        };
        this.button.appendChild(this.createNotificationBadge());
    }

    public mount(containerId: string): void {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container was not found: ${containerId}`);
        }

        const buttonContainer = document.createElement("div");
        buttonContainer.className = prefix("start-button-container");
        buttonContainer.appendChild(this.button);

        container.className = prefix("container");
        container.appendChild(buttonContainer);
    }

    public get active(): boolean {
        return this.button.classList.contains("active");
    }

    public set active(value: boolean) {
        if (value) {
            this.button.classList.add("active");
        } else {
            this.button.classList.remove("active");
        }
    }

    public set unreadCount(count) {
        const notification = this.button.querySelector(`.${prefix("notification-badge")}`) as HTMLSpanElement;
        if (count === 0) {
            notification.classList.add("hidden");
        } else {
            notification.innerText = count;
            notification.classList.remove("hidden");
        }
    }

    private clicked() {
        this.active = !this.active;
        this.clickHandler();
    }

    private createNotificationBadge() {
        const notificationBadge = document.createElement("span");
        notificationBadge.className = `${prefix("notification-badge")} hidden`;
        return notificationBadge;
    }
}
