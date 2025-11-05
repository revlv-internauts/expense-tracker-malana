export type Inventory = {
    id: number,
    item_name: string,
    serial_code: string,
    item_code: string,
    date_of_purchase: string
};

export type PaginatedLink = {
  url: string | null,
  label: string,
  active: boolean
}

export type Paginated<T> = {
  data: T[],
  links: PaginatedLink[],

  current_page: number | null,
  last_page: number | null,
  per_page: number | null,
  from: number | null,
  to: number | null,
  total: number | null,
}