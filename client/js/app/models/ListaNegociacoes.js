class ListaNegociacoes {

    constructor(funcaoUpdate) {
        this._negociacoes = [];
        this._funcaoUpdate = funcaoUpdate;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._funcaoUpdate(this);
    }
    get negociacoes() {
        return [].concat(this._negociacoes);
    }


    esvazia() {
        this._negociacoes = [];
        this._funcaoUpdate(this);
    }
}