import Faker from 'faker';
import Repository from "../models/Repository";
import Owner from "../models/Owner";

const LANGUAGES = ['JavaScript','Python','Ruby','PHP','Java'];

const getRandomLanguage = () => {
  return LANGUAGES[Faker.random.number(0, Object.keys(LANGUAGES).length - 1)];
};

const generateRepository = () => {
  const name = Faker.system.filePath();

  return new Repository({
    id: Faker.random.number(),
    full_name: `${Faker.name.firstName()}/${Faker.lorem.word()}`.toLowerCase(),
    description: Faker.lorem.sentence(),
    url: Faker.internet.url(),
    language: getRandomLanguage(),
    stargazers_count: Faker.random.number(),
  }, new Owner({
    id: Faker.random.number(),
    login: Faker.internet.userName().toLowerCase(),
    url: Faker.internet.url(),
  }));
};

export default generateRepository;
