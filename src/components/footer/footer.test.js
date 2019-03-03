import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utils/test';
import Footer from './footer.component';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders without crashing', () => {
  const wrapper = shallow(<Footer />);
  const footer = findByTestAttr(wrapper, "app-footer");
  expect(footer.length).toBe(1);
});
