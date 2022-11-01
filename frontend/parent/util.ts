export function containerClass(): string {
    return prefix("container");
}

export function iframeClass(): string {
    return prefix("iframe");
}

export function prefix(value: string): string {
    return `automattic-chatrix-${value}`;
}
