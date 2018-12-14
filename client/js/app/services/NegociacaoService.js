class NegociacaoService {

    constructor() {
    }

    obterNegociacoesDaSemana(callBack) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            /*
               0: requisição ainda não estabelecida.
               1: conexão com o servidor estabelecida.
               2: requisição recebida.
               3: processando requisição.
               4: requisição concluída e a resposta esta pronta.
            */
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callBack(null,
                        JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                } else {
                    console.log(xhr.responseText);
                    callBack('Não foi possível obter as negociações', null);
                }
            }
        };

        xhr.send();
    }
}
