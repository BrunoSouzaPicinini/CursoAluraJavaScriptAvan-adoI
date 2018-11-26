class NegociacaoController {

    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputdata = $("#data");
        this._inputquantidade = $('#quantidade');
        this._inputvalor = $('#valor');

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get: function(target, property, receiver) {
                if(['adiciona', 'esvazia'].includes(property) && typeof(target[property]) == typeof(Function)) {
                    return function () {
                        console.log(`interceptando ${property}`);
                        Reflect.apply(target[property], target, arguments);
                        self._negociacaoView.update(target);
                    }
                }
                return Reflect.get(target, property, receiver);
            }

        });

        this._negociacaoView = new NegociacoesView($('#negociacoesView'));



        this._negociacaoView.update(this._listaNegociacoes);
        this._listaNegociacoes = new ListaNegociacoes();

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }


    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = new Mensagem('Negociacao adicionada com sucesso');
        this._mensagemView.update( this._mensagem.texto);

        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputdata.value),
            this._inputquantidade.value,
            this._inputvalor.value
        );
    }

    _limpaFormulario() {
        this._inputdata.value = '';
        this._inputquantidade.value = 1;
        this._inputvalor.value = 0.0;

        this._inputdata.focus();
    }
}