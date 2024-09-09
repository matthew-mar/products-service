export interface Paginator<T> {
    items: Iterable<T>;
    page: number;
    totalPages: number;
    onPage: number;
    previous: number | null;
    next: number | null;
}
