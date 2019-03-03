import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utils/test';
import { PageTurner } from './page-turner.component';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props  = {}, state = null) => {
  const wrapper = shallow(<PageTurner {...props} />);
  if (state)
    wrapper.setState(state);

  return wrapper
};

const paginationFirstPage = {
  current: '1',
  next: '2',
  last: '10',
};

const paginationLastPage = {
  current: '10',
  prev: '9',
  first: '1',
};

const paginationMiddlePage = {
  current: '5',
  prev: '4',
  first: '1',
  next: '6',
  last: '10',
};

test('renders without crashing', () => {
  const wrapper = setup({ pagination: paginationFirstPage });
  const pageTurner = findByTestAttr(wrapper, "page-turner");
  expect(pageTurner.length).toBe(1);
});

test('renders non-dynamic page selectors', () => {
  const wrapper = setup({ pagination: paginationFirstPage });

  const first = findByTestAttr(wrapper, "page-selector-first");
  expect(first.length).toBe(1);

  const previous = findByTestAttr(wrapper, "page-selector-previous");
  expect(previous.length).toBe(1);

  const next = findByTestAttr(wrapper, "page-selector-next");
  expect(next.length).toBe(1);

  const last = findByTestAttr(wrapper, "page-selector-last");
  expect(last.length).toBe(1);
});

test('renders only 3 numbered page selectors when on first page', () => {
  const wrapper = setup({ pagination: paginationFirstPage });
  const numberedPageSelectors = findByTestAttr(wrapper, "numbered-page-selector");
  expect(numberedPageSelectors.length).toBe(3);
});

test('disables the previous and first page selectors when on the first page', () => {
  const wrapper = setup({ pagination: paginationFirstPage });

  const first = findByTestAttr(wrapper, "page-selector-first");
  expect(first.props().disabled).toBeTruthy();

  const previous = findByTestAttr(wrapper, "page-selector-previous");
  expect(previous.props().disabled).toBeTruthy();
});

test('disables the next and last page selectors when on the last page', () => {
  const wrapper = setup({ pagination: paginationLastPage });

  const next = findByTestAttr(wrapper, "page-selector-next");
  expect(next.props().disabled).toBeTruthy();

  const last = findByTestAttr(wrapper, "page-selector-last");
  expect(last.props().disabled).toBeTruthy();
});

test('renders only 3 numbered page selectors when on last page', () => {
  const wrapper = setup({ pagination: paginationLastPage });
  const numberedPageSelectors = findByTestAttr(wrapper, "numbered-page-selector");
  expect(numberedPageSelectors.length).toBe(3);
});

test('renders 5 numbered page selectors when on middle page', () => {
  const wrapper = setup({ pagination: paginationMiddlePage });
  const numberedPageSelectors = findByTestAttr(wrapper, "numbered-page-selector");
  expect(numberedPageSelectors.length).toBe(5);
});

test('shows the correct active numbered selector', () => {
  const wrapper = setup({ pagination: paginationMiddlePage });
  const numberedPageSelectors = findByTestAttr(wrapper, "numbered-page-selector");
  const activePage = numberedPageSelectors.getElements().filter((el) => el.props.active);

  expect(activePage.length).toBe(1);
  expect(activePage[0].key).toMatch(paginationMiddlePage.current);
});

test('calls the getRepos function when clicking on a selector', () => {
  const query = 'tetris';
  const getRepos = jest.fn();
  const wrapper = setup({
    pagination: paginationFirstPage,
    query,
    getRepos });
  const nonActiveSelector = findByTestAttr(wrapper, "numbered-page-selector")
    .findWhere(
      (element) => element.props().active === false
    )
    .first();

  nonActiveSelector.simulate('click');

  setTimeout(() => {
    expect(getRepos).toHaveBeenCalled();
    expect(getRepos.mock.calls[0][0]).toBe(query);
    expect(getRepos.mock.calls[0][1]).toBe(nonActiveSelector.text());
  }, 0);
});
