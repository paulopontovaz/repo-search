import Owner from "./Owner";

export default class Repository {
  constructor ({
    id,
    full_name,
    description,
    url,
    language,
    stargazers_count
  }, owner) {
    this.id = id;
    this.name = full_name;
    this.description = description;
    this.url = url;
    this.language = language;
    this.stars = stargazers_count;
    this.owner = new Owner(owner);
  };
}
