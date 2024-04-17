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
    address: string;
    email: string;
    phone: string;
    active: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
};

export type OptionType = {
    label: string;
    value: string | number;
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
    playersQuantity: number;
    location: string;
    initDate: string;
    endDate: string;
    playerMode: string;
    gameMode: string;
    tournamentTypeId: string;
    qtySetPerTable: number;
    qtySetPerFinal: number;
    emailRemember: boolean;
    access: string;
    moneyPrice: string;
}

export interface ITournamentAddPlayer {
    firstname: string;
    lastname: string;
    documentId: string;
    email: string;
    phone: string;
    role: string;
    userFromSelect?: any;
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

export interface ILoginInterfaceResponse {
    timestamp: string;
    data: {
        token: string;
        refreshToken: string;
    }
}