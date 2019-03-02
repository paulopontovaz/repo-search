import Axios from '../config';
import SEARCH_TYPES from '../search-types.enum';
import RepositorySearchParams from "../../models/repository-search-params/RepositorySearchParams";
import Repository from "../../models/repository/Repository";

export const getRepos = async (searchParams: RepositorySearchParams): Promise<Repository[]> => {
  const base = `/${SEARCH_TYPES.REPOSITORIES}`;
  const queryArr = [
      `sort=${searchParams.sort}`,
      `order=${searchParams.order}`,
      `per_page=${searchParams.perPage}`,
      `page=${searchParams.page}`
  ];

  if (searchParams.query)
    queryArr.unshift(`q=${searchParams.query.split(' ').join('+')}`);

  return Axios.get(`${base}?${queryArr.join('&')}`);//.then((res: any) => res.json());
};
