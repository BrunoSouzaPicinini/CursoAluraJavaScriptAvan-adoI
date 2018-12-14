class NegociacaoController {

    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputdata = $('#data');
        this._inputquantidade = $('#quantidade');
        this._inputvalor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociacao adicionada com sucesso';
        this._limpaFormulario();
    }

    importaNegociacoes() {
        let service = new NegociacaoService();
        service.obterNegociacoesDaSemana((erro, negociacoes) => {

            if(erro) {
                this._mensagem.text = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.text = 'Negociações importadas com sucesso';
        });
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
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