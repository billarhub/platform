export type Pagination = {
    count: number;
    pageInfo: {
        currentPage: number;
        perPage: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
};

export type Steps = {
    label: string
    component?: React.ReactNode
    icon: React.ComponentType<{ className?: string }>;
}

export type Player = {
    firstName: string;
    lastName: string;
    location: string;
    email: string;
    phone: string;
    active: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
};
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
    email: string;
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

export interface ITournamentAddPlayer {
    firstName: string;
    lastName: string;
    location: string;
    email: string;
    phone: string;
    active: boolean;
}

export interface IDecodedJwt {
    userId: string;
    role: string | null;
    iat: number;
}

export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    documentId: string;
    email: string;
    phone: string;
    role: string;
}