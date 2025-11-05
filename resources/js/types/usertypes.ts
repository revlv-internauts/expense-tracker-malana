export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
};

export type PaginateLink = {
    url: string | null,
    label: string,
    active: boolean
}

export type Paginated<T> = {
    data: T[],
    links: PaginateLink[];

    current_page: number | null;
    last_page: number | null;
    per_page: number | null;
    from: number;
    to: number | null;
    total: number| null;
}