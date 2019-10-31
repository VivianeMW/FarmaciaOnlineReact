import React, { Component } from 'react';

import ValorTotalItensCarrinho from '../../valorTotalItensCarrinho';
import { Link }                from 'react-router-dom';

export default class DivResumo extends Component {


    render() {
        return (
            <div className="div-resumo">
                <strong>Resumo Pedido</strong>
                <div className="itens-resumo">
                    <span>Subtotal({this.props.qtdProdutos} produto(os))</span>
                    <span>
                        <ValorTotalItensCarrinho />
                    </span>
                </div>
                <div className="itens-resumo">
                    <span>Frete</span>
                    <span>
                        <ValorTotalItensCarrinho />
                    </span>
                </div>
                <hr/>
                <div className="itens-resumo-total">
                    <span>Total</span>
                    <span>
                        <ValorTotalItensCarrinho />
                    </span>
                </div>
                <hr/>
                <Link to={"/Compra/Endereco"}>
                    <span><button className="btn azul-roxo clicavel" type="button">Comprar</button></span>
                </Link>
            </div>
        );
    }

}