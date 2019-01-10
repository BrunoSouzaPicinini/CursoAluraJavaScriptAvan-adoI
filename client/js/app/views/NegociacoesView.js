class NegociacoesView extends View{

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
    
            <tbody>
                ${model.negociacoes.map(value => {
                    return `
                        <tr>
                            <td>${DateHelper.dataParaTexto(value.data)}</td>
                            <td>${value.quantidade}</td>
                            <td>${value.valor}</td>
                            <td>${value.volume}</td>
                        </tr>                                          
                    `    
                    }).join('')
                }                
            </tbody>
    
            <tfoot>
                <td colspan="3"></td>
                <td>${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}</td>
            </tfoot>
        </table>
        `;
    }

}
