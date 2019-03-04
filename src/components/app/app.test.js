import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utils/test-helper';
import App from './app.component';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props  = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state)
    wrapper.setState(state);

  return wrapper
};

test('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1)
});

test('renders header', () => {
  const wrapper = setup();
  const header = findByTestAttr(wrapper, "app-header");
  expect(header.length).toBe(1)
});

test('renders footer', () => {
  const wrapper = setup();
  const footer = findByTestAttr(wrapper, 'app-footer');
  expect(footer.length).toBe(1)
});

test('renders search results', () => {
  const wrapper = setup();
  const searchResults = findByTestAttr(wrapper, "search-results");
  expect(searchResults.length).toBe(1)
});
