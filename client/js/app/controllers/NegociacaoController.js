class NegociacaoController {

    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputdata = $("#data");
        this._inputquantidade = $('#quantidade');
        this._inputvalor = $('#valor');
    }


    adiciona(event) {
        event.preventDefault();

        let data = new Date(...
            this._inputdata.value
            .split('-')
            .map( (item, indice) => item - (indice == 1 ? 1 : 0))
        );
        console.log(data);

    }

}