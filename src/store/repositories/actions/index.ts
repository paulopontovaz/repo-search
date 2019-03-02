import ACTION_TYPES from "./action-types.enum";
import Repository from "../../../models/repository/Repository";
import RepositorySearchParams from "../../../models/repository-search-params/RepositorySearchParams";
import { getRepos } from "../../../api/repositories";
import {Dispatch} from "redux";

interface IFetchReposRequestAction {
    readonly type: typeof ACTION_TYPES.GET_REPOS_REQUEST,
}

interface IFetchReposSuccessAction {
    readonly type: typeof ACTION_TYPES.GET_REPOS_SUCCESS,
    readonly payload: Repository[],
}

interface IFetchReposFailureAction {
    readonly type: typeof ACTION_TYPES.GET_REPOS_FAILURE,
    readonly payload: any,
    readonly error: Boolean,
}

interface IFetchSelectedRepoAction {
    readonly type: typeof ACTION_TYPES.GET_SELECTED_REPO,
    readonly payload: number,
}

export type RepoAction =
    IFetchReposRequestAction |
    IFetchReposSuccessAction |
    IFetchReposFailureAction |
    IFetchSelectedRepoAction;
type PromiseAction = Promise<RepoAction>
type ThunkAction = (dispatch: Dispatch) => any
export type DispatchAction = (action: RepoAction | ThunkAction | PromiseAction) => any

const createFetchReposRequestAction =
    (): RepoAction => ({ type: ACTION_TYPES.GET_REPOS_REQUEST });

const createFetchReposSuccessAction =
    (repos: Repository[]): RepoAction => ({
        type: ACTION_TYPES.GET_REPOS_SUCCESS,
        payload: repos,
    });

const createFetchReposFailureAction =
    (error: any): RepoAction => ({
        type: ACTION_TYPES.GET_REPOS_FAILURE,
        payload: error,
        error: true,
    });

const createFetchSelectedRepoAction =
    (id: number): RepoAction => ({
        type: ACTION_TYPES.GET_SELECTED_REPO,
        payload: id,
    });

export const fetchRepos = (searchParams: RepositorySearchParams)  =>
    (dispatch: Dispatch) => {
        dispatch(createFetchReposRequestAction());

        return getRepos(searchParams)
            .then((repos: Repository[]) => dispatch(createFetchReposSuccessAction(repos)))
            .catch((error: any) => dispatch(createFetchReposFailureAction(error)))
    };

export const fetchSelectedRepo = (id: number)  =>
    (dispatch: Dispatch) =>
        dispatch(createFetchSelectedRepoAction(id));
