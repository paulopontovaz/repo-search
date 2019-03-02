export default class RepositorySearchParams {
    constructor(
        _query,
        _page = 1,
        _perPage = 25,
        _sort = 'stars',
        _order = 'desc',
    ) {
        this.query = _query;
        this.sort = _sort;
        this.order = _order;
        this.perPage = _perPage;
        this.page = _page;
    }
}
