class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputdata = $('#data');
        this._inputquantidade = $('#quantidade');
        this._inputvalor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._ordemAtual = '';
    }

    adiciona(event) {
        event.preventDefault();

        try {
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociacao adicionada com sucesso';
            this._limpaFormulario();
        } catch (erro) {
            this._mensagem.texto = erro;
        }
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações adicionadas com sucesso';
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
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