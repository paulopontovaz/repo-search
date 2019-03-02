import Owner from "../owner/Owner";

export default class Repository {
    id: number;
    name: string;
    url: string;
    language: string;
    stars: number;
    owner: Owner;

    constructor (
        _id: number,
        _name: string,
        _url: string,
        _language: string,
        _stars: number,
        _owner: Owner
    ) {
        this.id = _id;
        this.name = _name;
        this.url = _url;
        this.language = _language;
        this.stars = _stars;
        this.owner = _owner;
    };
}
