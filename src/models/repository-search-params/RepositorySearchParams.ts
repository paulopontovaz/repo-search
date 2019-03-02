export default class RepositorySearchParams {
    query: string;
    sort: string;
    order: string;
    perPage: number;
    page: number;

    constructor(
        _query: string = '',
        _sort: string = 'stars',
        _order: string = 'desc',
        _perPage: number = 25,
        _page: number = 1,
    ) {
        this.query = _query;
        this.sort = _sort;
        this.order = _order;
        this.perPage = _perPage;
        this.page = _page;
    }
}
