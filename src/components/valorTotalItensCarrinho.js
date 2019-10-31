import React, { Component } from 'react';

import NumberFormat from 'react-number-format';

export default class ValorTotalItensCarrinho extends Component {

    getValorTotal = () => {
        let produtos = [],
            chaves   = Object.keys(localStorage),
            qChaves  = chaves.length,
            preco    = 0;

        while( qChaves-- ) {
            produtos.push(JSON.parse(localStorage.getItem(chaves[qChaves])));
        }


        for(let i = 0; i < produtos.length; i++) {
            if(isNaN(produtos[i].preco)) {
                continue;
            }
            preco += produtos[i].preco;
        }

        return preco;
    }

    render() {
        return (
            <NumberFormat
            value={this.getValorTotal()} 
            displayType={'text'}
            prefix={'R$'}
            decimalSeparator={','}
            decimalScale={2}
            fixedDecimalScale={true}
            />
        );
    }

}