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
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    }

}