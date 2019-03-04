import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utils/test-helper';
import { Header } from './header.component';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props  = {}, state = null) => {
  const wrapper = shallow(<Header {...props} />);
  if (state)
    wrapper.setState(state);

  return wrapper
};

test('renders without crashing', () => {
  const wrapper = setup();
  const header = findByTestAttr(wrapper, "app-header");
  expect(header.length).toBe(1);
});

test('renders search box', () => {
  const wrapper = setup();
  const searchBox = findByTestAttr(wrapper, "search-box");
  expect(searchBox.length).toBe(1);
});

test('calls the getRepos() function with the right arguments when search-box is filled', () => {
  const wrapper = setup();
  const getRepos = jest.fn();
  const searchBox = findByTestAttr(wrapper, "search-box");
  const queryText = 'tetris';

  wrapper.setProps({ getRepos });
  searchBox.simulate('change', { target: { value: queryText } });

  expect(getRepos).toHaveBeenCalled();
  expect(getRepos.mock.calls[0][0]).toBe(queryText);
});
