import IOwner from "./IOwner";

export default class Owner implements IOwner {
    id: number;
    name: string;
    url: string;

    constructor (
        _id: number,
        _name: string,
        _url: string
    ) {
        this.id = _id;
        this.name = _name;
        this.url = _url;
    };
}
