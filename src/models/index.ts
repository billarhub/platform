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

export interface ITournamentConfiguration {
    name: string;
    players: number;
    place: string;
    startDate: string;
    endDate: string;
    playerMode: string;
    gameMode: string;
    tournamentType: string;
    sets: number;
    finalSet: number;
    emailNotificacion: boolean;
    access: string;
    tournamentValue: string;
}