export interface IRoute {
    text: string;
    href: string;
    as: string;
    privileges?: string[];
    icon?: JSX.Element;
    isCollapsible?: boolean;
    subLinks?: Array<Partial<IRoute>>;
    show?: boolean;
    accent?: boolean;
}

export interface ILoginPayload {
    name: string;
    password: string;
}