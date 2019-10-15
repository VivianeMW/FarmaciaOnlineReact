import React, { Component } from 'react';

import '../css/cssPageCarrinho.css';

import ImgReme      from '../img/reme1.jpg';
import NumberFormat from 'react-number-format';

import { ContextoUsuario } from '../components/Session';

const LIMIT_ITENS = 4;

export default class PageCarrinho extends Component {

    static contextType = ContextoUsuario;

    state = {
        produtos  : [],
        tProdutos : [],
        produto   : {},
        page      : 1,
        pages     : 1
    }

    componentDidMount() {
        this.carregaProdutos();
    };

    carregaProdutos = async (page = 1) => {
        let aProdutos = [],
            chaves    = Object.keys(localStorage),
            i         = chaves.length;

        while( i-- ) {
            aProdutos.push(JSON.parse(localStorage.getItem(chaves[i])));
        }    

        let result      = [];
        let totalPage   = Math.ceil(aProdutos.length/LIMIT_ITENS); 
        let count       = (page * LIMIT_ITENS) - LIMIT_ITENS;
        let delimitador = count + LIMIT_ITENS;

        for(let i = count; i < delimitador; i++) {
            if(aProdutos[i] != null) {
                result.push(aProdutos[i]);
            }
        }

        this.setState({
            produtos : result,
            tProdutos: aProdutos,
            pages    : totalPage,
            page
        });
    };

    removeLocalStorege = (id) => {
        localStorage.removeItem(id);
        window.location.reload();
    };

    getPrecoTotal = () => {
        const { tProdutos } = this.state;
        let preco = 0;

        for(let i = 0; i < tProdutos.length; i++) {
            preco += tProdutos[i].preco;
        }

        return preco;
    };

    nextPage = () => {
        const { page, pages } = this.state;

        if(page == pages) {
            return;
        }

        const nPagina = page + 1;

        this.carregaProdutos(nPagina);
    };

    prevPage = () => {
        const { page } = this.state;

        if(page == 1) {
            return;
        }

        const nPagina = page - 1;

        this.carregaProdutos(nPagina);
    };

    render() {
        const { produtos, page, pages } = this.state;
        return (
            <div className="main-container-carrinho">
                <div className="grid-main">
                    {produtos.length > 0? (
                        <ul>
                            {produtos.map(produto =>{
                                return (
                                    <li key={produto.id}>
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
                                                    <button onClick={e => this.removeLocalStorege(produto.id)}>remover</button>
                                            </div>
                                            <div className="div-entrega-carrinho">
                                                <span>10/10/2019</span>
                                            </div>
                                            <div className="div-preco-carrinho">
                                               <NumberFormat 
                                                    value={produto.preco} 
                                                    displayType={'text'}
                                                    prefix={'R$'}
                                                    decimalSeparator={','}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                />
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
                                <span>
                                    <NumberFormat 
                                        value={this.getPrecoTotal()} 
                                        displayType={'text'}
                                        prefix={'R$'}
                                        decimalSeparator={','}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                    />
                                </span>
                            </div>
                            <div  className="itens-resumo">
                                <span>Frete</span>
                                <span>
                                    <NumberFormat 
                                        value={this.getPrecoTotal()} 
                                        displayType={'text'}
                                        prefix={'R$'}
                                        decimalSeparator={','}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                    />
                                </span>
                            </div>
                            <hr/>
                            <div className="itens-resumo-total">
                                <span>Total</span>
                                <span>
                                    <NumberFormat 
                                        value={this.getPrecoTotal()} 
                                        displayType={'text'}
                                        prefix={'R$'}
                                        decimalSeparator={','}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                    />
                                </span>
                            </div>
                            <hr/>
                            {/* <div className="div-resumo-botao">
                                <button className="btn-compra">Continuar</button>
                            </div>         */}
                        </div>
                    ) : ""}
                </div>
                
               
                {produtos.length > 0? (
                    <footer className="footer-main-container">
                        <div className="actions">
                            <button disabled={page == 1}     onClick={this.prevPage}>Anterior</button>
                            <button disabled={page == pages} onClick={this.nextPage}>Proximo</button>
                        </div>
                    </footer>
                ) : ""}
            </div>
        );
    }

}