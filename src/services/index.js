import models from "../models";
class Service {

    _models = null;

    constructor() {
        this._models = models;
    }

    get models() {
        return this._models;
    }
}

export default Service;