import * as actions from './index';
import ACTION_TYPES from './action-types.enum';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { getRepos } from "../../../api/repositories";
import RepositorySearchParams from "../../../models/RepositorySearchParams";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

beforeEach(() => {
  store.clearActions();
});

test('should create the correct actions', async () => {
  const query = 'tetris';
  const { repos, search: searchInfo } = await getRepos(new RepositorySearchParams(query, 1));

  const expectedActions = [
    { type: ACTION_TYPES.GET_REPOS_REQUEST },
    { type: ACTION_TYPES.GET_REPOS_SUCCESS, payload: repos },
    { type: ACTION_TYPES.UPDATE_SEARCH_INFO, payload: searchInfo },
  ];

  return store.dispatch(actions.fetchRepos(query, 1)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
    expect(
      store.getActions().filter(
        (action) => action.type === ACTION_TYPES.GET_REPOS_FAILURE
      ).length
    ).toBe(0);
  });
});
