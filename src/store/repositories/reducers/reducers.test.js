import { default as reducer, searchInitialState } from './index';
import ACTION_TYPES from '../actions/action-types.enum';
import generateRepository from '../../../utils/repository.factory';

describe('loading reducer', () => {

  test('should return the initial state', () => {
    expect(reducer(undefined, {}).loading).toEqual({});
  });

  test('should handle GET_REPOS_SUCCESS', () => {
    expect(reducer(undefined, {
      type: ACTION_TYPES.GET_REPOS_SUCCESS,
      payload: [],
    }).loading).toEqual({ isFetching: false });
  });

  test('should handle GET_REPOS_FAILURE', () => {
    expect(reducer(undefined, {
      type: ACTION_TYPES.GET_REPOS_FAILURE,
    }).loading).toEqual({ isFetching: false });
  });

  test('should handle GET_REPOS_REQUEST', () => {
    expect(reducer(undefined, {
      type: ACTION_TYPES.GET_REPOS_REQUEST,
    }).loading).toEqual({ isFetching: true });
  });

});

describe('repos reducer', () => {

  test('should return the initial state', () => {
    expect(reducer(undefined, {}).repos).toEqual([]);
  });

  test('should handle GET_REPOS_SUCCESS', () => {
    const mockRepoList = [...new Array(10)].map(() => generateRepository());

    expect(reducer(undefined, {
      type: ACTION_TYPES.GET_REPOS_SUCCESS,
      payload: [],
    }).repos).toEqual([]);

    expect(reducer(undefined, {
      type: ACTION_TYPES.GET_REPOS_SUCCESS,
      payload: mockRepoList,
    }).repos).toEqual(mockRepoList);
  });

});

describe('search reducer', () => {

  test('should return the initial state', () => {
    expect(reducer(undefined, {}).search).toEqual(searchInitialState);
  });

  test('should handle UPDATE_SEARCH_INFO', () => {
    const previousState = {
      pagination: {
        current: '1',
        next: '2',
        last: '10',
      },
      itemsCount: 250,
      query: 'tetris',
    };

    const newState = {
      pagination: {
        current: '5',
        next: '6',
        last: '10',
        prev: '4',
        first: '1',
      },
      itemsCount: 250,
      query: 'tetris',
    };

    expect(reducer({ search: previousState }, {
      type: ACTION_TYPES.UPDATE_SEARCH_INFO,
      payload: newState,
    }).search).toEqual(newState);
  });

});
