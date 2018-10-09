class Negociacao {
    constructor(data, quantidate, valor) {
        this._data = new Date(data.getTime());
        this._quantidade = quantidate;
        this._valor = valor;
        this._quantidate = quantidate;
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidate() {
        return this._quantidate;
    }

    get valor() {
        return this._valor;
    }
}