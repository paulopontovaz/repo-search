import ACTION_TYPES from "./action-types.enum";
import { getRepos } from "../../../api/repositories";
import RepositorySearchParams from '../../../models/RepositorySearchParams';

const createFetchReposRequestAction =
    () => ({ type: ACTION_TYPES.GET_REPOS_REQUEST });

const createFetchReposSuccessAction =
    (repos) => ({
        type: ACTION_TYPES.GET_REPOS_SUCCESS,
        payload: repos,
    });

const createFetchReposFailureAction =
    (error) => ({
        type: ACTION_TYPES.GET_REPOS_FAILURE,
        payload: error,
        error: true,
    });

const createUpdateSearchInfoAction =
  (searchInfo) => ({
    type: ACTION_TYPES.UPDATE_SEARCH_INFO,
    payload: searchInfo,
  });

export const fetchRepos = (query, page) =>
    (dispatch) => {
        dispatch(createFetchReposRequestAction());

        return getRepos(new RepositorySearchParams(query, page))
            .then((data) => {
              dispatch(createFetchReposSuccessAction(data.repos));
              dispatch(createUpdateSearchInfoAction(data.search));
            })
            .catch((error) => dispatch(createFetchReposFailureAction(error)))
    };
