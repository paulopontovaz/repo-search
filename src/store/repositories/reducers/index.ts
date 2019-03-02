import {AnyAction, combineReducers} from 'redux'
import Repository from "../../../models/repository/Repository";
import { RepoAction } from "../actions";

interface ReposState {
    list: Repository[],
    selected: Repository,
}

const repos = (state: any = { list: [], selected: null }, action: RepoAction) => {
    switch (action.type) {
        default:
            return state
    }
};

const loading = (state: any = {}, { type }: RepoAction) => {
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if (!matches) {
        return state;
    }

    const [ , , requestState] = matches;

    return { ...state, isFetching: requestState === 'REQUEST' };
};

export default combineReducers({
    repos,
    loading,
});
