import { combineReducers } from 'redux';
import ACTION_TYPES from "../actions/action-types.enum";

export const searchInitialState = {
  pagination: {
    current: null,
    next: null,
    last: null,
    prev: null,
    first: null,
  },
  itemsCount: null,
  query: '',
};

const repos = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_REPOS_SUCCESS:
      return [ ...action.payload ];
    default:
      return state;
  }
};

const search = (state = searchInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_SEARCH_INFO:
      return { ...action.payload };
    default:
      return state;
  }
};

const loading = (state = {}, { type }) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) {
    return state;
  }

  const [ , , requestState] = matches;

  return { ...state, isFetching: requestState === 'REQUEST' };
};

export default combineReducers({
  repos,
  search,
  loading,
});
