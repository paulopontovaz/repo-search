import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utils/test';
import { SearchResults } from './search-results.component';
import { getRepos } from '../../api/repositories';
import RepositorySearchParams from "../../models/RepositorySearchParams";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props  = {}, state = null) => {
  const wrapper = shallow(<SearchResults {...props} />);
  if (state)
    wrapper.setState(state);

  return wrapper
};

test('renders without crashing', () => {
  const wrapper = setup();
  const searchResults = findByTestAttr(wrapper, "search-results");
  expect(searchResults.length).toBe(1);
});

test('renders the "no results" message when "search" prop is not set', async () => {
  const wrapper = setup();
  const message = findByTestAttr(wrapper, "no-results-message");
  expect(message.length).toBe(1);
});

test('renders the "no results" message when list is empty', async () => {
  const wrapper = setup({ search: { itemsCount: 0 } });
  const message = findByTestAttr(wrapper, "no-results-message");
  expect(message.length).toBe(1);
});

test('does not render the "no results" message when list has items', async () => {
  const wrapper = setup({ search: { itemsCount: 10 } });
  const message = findByTestAttr(wrapper, "no-results-message");
  expect(message.length).toBe(0);
});

test('shows the correct number of results found when list has items', async () => {
  const itemsCount = 10;
  const wrapper = setup({ search: { itemsCount } });
  const itemsCountComponent = findByTestAttr(wrapper, "search-items-count");
  expect(itemsCountComponent.length).toBe(1);
  expect(itemsCountComponent.text()).toMatch(itemsCount.toString());
});

test('shows the correct number of result items when list has items', async () => {
  const { repos, search } = await getRepos(new RepositorySearchParams('tetris', 1));
  const wrapper = setup({ repos, search });
  const resultItemComponents = findByTestAttr(wrapper, "result-item");
  expect(resultItemComponents.length).toBe(repos.length);
});

test('shows the page turner component when list has items', async () => {
  const { repos, search } = await getRepos(new RepositorySearchParams('tetris', 1));
  const wrapper = setup({ repos, search });
  const pageTurnerComponent = findByTestAttr(wrapper, "page-turner");
  expect(pageTurnerComponent.length).toBe(1);
});
