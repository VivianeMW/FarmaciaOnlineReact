import React, { Component } from 'react';

import '../css/cssPageCarrinho.css';

export default class PageCarrinho extends Component {

    state = {
        produtos : [
            {
                img      : "Andrew",
                titulo   : "Nome do Produto",
                descricao: "asasasasasasasasasasasasasasasasadsdsdd",
                preco    : 10
            },
            {
                img      : "Andrew",
                titulo   : "Nome do Produto",
                descricao: "asasasasasasasasasasasasasasasasadsdsdd",
                preco    : 10
            },
        ]
    }

    render() {
        const { produtos } = this.state;
        return (
            <div className="main-container-carrinho">
                {produtos.length > 0? (
                    <ul>
                        {produtos.map(produto =>{
                            return (
                                <li key={produto._id}>
                                    <div className="div-card-carrinho">
                                        <h5 className="h-titulo">Produto</h5>
                                        <h5 className="h-titulo">Descricao</h5>
                                        <h5 className="h-titulo">Quantidade</h5>
                                        <h5 className="h-titulo">Data</h5>
                                        <h5 className="h-titulo">Preço</h5>
                                        <div className="div-img-carrinho">
                                            {produto.img}
                                        </div>
                                        <div className="div-descricao-carrinho">
                                            <p>{produto.descricao}</p>
                                        </div>
                                        <div className="div-qtd-carrinho">
                                            <span>Quantidade</span>
                                        </div>
                                        <div className="div-entrega-carrinho">
                                            <span>10/10/2019</span>
                                        </div>
                                        <div className="div-preco-carrinho">
                                            {produto.preco}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}    
                    </ul>
                ): (
                    <div className="empty">
                        Não há itens no carrinho :(
                    </div>
                )}
                <div className="div-resumo">
                    <strong>Resumo Pedido</strong>
                    <div className="itens-resumo">
                        <span>Subtotal({produtos.length} produto(os))</span>
                        <span>R$40</span>
                    </div>
                    <div  className="itens-resumo">
                        <span>Frete</span>
                        <span>R$40</span>
                    </div>
                    <hr/>
                    <div className="itens-resumo-total">
                       <span>Total</span>
                       <span>80</span>
                    </div>
                    <hr/>
                    <div className="div-resumo-botao">
                        <button className="btn-compra">Continuar</button>
                    </div>        
                </div>
            </div>
        );
    }

}