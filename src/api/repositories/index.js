import Axios from '../config';
import SEARCH_TYPES from '../search-types.enum';
import Repository from "../../models/Repository";
import Octopage from 'github-pagination';

export const getRepos = async (searchParams) => {
  const base = `/${SEARCH_TYPES.REPOSITORIES}`;
  const queryArr = [
    `q=${searchParams.query.split(' ').join('+')}`,
    `sort=${searchParams.sort}`,
    `order=${searchParams.order}`,
    `page=${searchParams.page}`,
    `per_page=${searchParams.perPage}`,
  ];

  return Axios.get(`${base}?${queryArr.join('&')}`)
    .then((response) => ({
      repos: response.data.items.map(
          (repo) => new Repository(repo, repo.owner)
      ),
      search: {
        pagination: {
          ...Octopage.parser(response.headers.link),
          current: searchParams.page,
        },
        itemsCount: response.data.total_count,
        query: searchParams.query,
      },
    }))
    .catch((error) => console.error(error));
};
