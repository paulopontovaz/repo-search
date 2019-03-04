import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utils/test-helper';
import ResultItem from './result-item.component';
import Repository from "../../models/Repository";
import Owner from "../../models/Owner";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props  = {}, state = null) => {
  const wrapper = shallow(<ResultItem {...props} />);
  if (state)
    wrapper.setState(state);

  return wrapper
};

const repo = new Repository({
  id: 68911683,
  full_name: 'daniel-e/tetros',
  description: 'Tetris that fits into the boot sector.',
  url: 'https://api.github.com/repos/daniel-e/tetros',
  language: 'Assembly',
  stargazers_count: 666,
}, new Owner({
  id: 5294331,
  login: 'daniel-e',
  url: 'https://api.github.com/users/daniel-e',
}));

test('renders without crashing', () => {
  const wrapper = setup({ repo });
  const resultItem = findByTestAttr(wrapper, "result-item");
  expect(resultItem.length).toBe(1);
});

test('renders repository name and shows the correct values', () => {
  const wrapper = setup({ repo });

  const repoNameComponent = findByTestAttr(wrapper, 'repo-name');
  expect(repoNameComponent.length).toBe(1);

  const repoUrl = repoNameComponent.props().href;
  const repoName = repoNameComponent.find('strong').text();
  expect(repoUrl).toBeTruthy();
  expect(repoUrl).toMatch(repo.url);
  expect(repoName).toMatch(repo.name);
});

test('renders repository language when the language has value', () => {
  const wrapper = setup({ repo });

  const repoLanguageComponent = findByTestAttr(wrapper, 'repo-language');
  expect(repoLanguageComponent.length).toBe(1);

  const repoLanguage = repoLanguageComponent.text();
  expect(repoLanguage).toMatch(repo.language);
});

test('does not render repository language when the language has no value', () => {
  const repoWithoutLanguage = { ...repo };
  delete repoWithoutLanguage.language;
  const wrapper = setup({ repo: repoWithoutLanguage });

  const repoLanguageComponent = findByTestAttr(wrapper, 'repo-language');
  expect(repoLanguageComponent.length).toBe(0);
});

test('renders repository stars and shows the correct value', () => {
  const wrapper = setup({ repo });

  const repoStarsComponent = findByTestAttr(wrapper, 'repo-stars');
  expect(repoStarsComponent.length).toBe(1);

  const repoStars = repoStarsComponent.text();
  expect(repoStars).toMatch(repo.stars.toString());
});

test('renders repository description and shows the correct value', () => {
  const wrapper = setup({ repo });

  const repoDescriptionComponent = findByTestAttr(wrapper, 'repo-description');
  expect(repoDescriptionComponent.length).toBe(1);

  const repoDescription = repoDescriptionComponent.text();
  expect(repoDescription).toMatch(repo.description);
});

test('renders repository owner and shows the correct values', () => {
  const wrapper = setup({ repo });

  const repoOwnerComponent = findByTestAttr(wrapper, 'repo-owner');
  expect(repoOwnerComponent.length).toBe(1);

  const repoOwnerUrl = repoOwnerComponent.props().href;
  const repoOwnerLogin = repoOwnerComponent.text();
  expect(repoOwnerUrl).toBeTruthy();
  expect(repoOwnerUrl).toMatch(repo.owner.url);
  expect(repoOwnerLogin).toMatch(repo.owner.login);
});
