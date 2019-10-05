import React, { Component } from 'react';

import '../css/cssPageCarrinho.css';
import ImgReme from '../img/reme1.jpg';

export default class PageCarrinho extends Component {

    state = {
        produtos : []
    }

    componentDidMount() {
        this.carregaProdutos();
    };

    carregaProdutos = async () => {
        let aProdutos = [],
            chaves  = Object.keys(localStorage),
            i = chaves.length;

        while( i-- ) {
            aProdutos.push(JSON.parse(localStorage.getItem(chaves[i])));
        }    

        this.setState({
            produtos : (aProdutos.length == 0)? [] : aProdutos
        });
    };

    getPrecoTotal = () => {
        const { produtos } = this.state;
        let preco = 0;

        for(let i = 0; i < produtos.length; i++) {
            preco += produtos[i].preco;
        }

        return preco;
    };

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
                                           <img id="img-reme-peq" src={ImgReme}/> 
                                        </div>
                                        <div className="div-descricao-carrinho">
                                            <p>{produto.descricao}</p>
                                        </div>
                                        <div className="div-qtd-carrinho">
                                                {produto.quantidade > 0? (
                                                    <select>
                                                        <option value="1" label="1">1</option>
                                                        <option value="3" label="3">3</option>
                                                        <option value="5" label="5">5</option>
                                                    </select>
                                                ) : (
                                                    <select>
                                                        <option value="0" label="0">0</option>
                                                    </select>
                                                )}
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

                {produtos.length > 0 ? (
                        <div className="div-resumo">
                        <strong>Resumo Pedido</strong>
                        <div className="itens-resumo">
                            <span>Subtotal({produtos.length} produto(os))</span>
                            <span>R${this.getPrecoTotal()}</span>
                        </div>
                        <div  className="itens-resumo">
                            <span>Frete</span>
                            <span>R${this.getPrecoTotal()}</span>
                        </div>
                        <hr/>
                        <div className="itens-resumo-total">
                           <span>Total</span>
                           <span>{this.getPrecoTotal()}</span>
                        </div>
                        <hr/>
                        {/* <div className="div-resumo-botao">
                            <button className="btn-compra">Continuar</button>
                        </div>         */}
                    </div>
                ) : ""}
            </div>
        );
    }

}