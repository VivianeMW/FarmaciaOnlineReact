import React, { Component } from 'react';

import ImgReme      from '../../../img/reme1.jpg';
import NumberFormat from 'react-number-format';
import DivVazia     from '../../divVazia';
import DivResumo    from './divResumo';

export default class PaginacaoCarrinho extends Component {

    removeLocalStorege = (id) => {
        localStorage.removeItem(id);
        this.props.callbackParent(true);
    };

    render() {

        const { produtos } = this.props;

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
                        <DivVazia mensagem={"Não há produtos no carrinho :("}/>
                    )}

                    {produtos.length > 0 ? (
                        <DivResumo qtdProdutos={produtos.length} />
                    ) : ""}
                </div>
            </div>
        );
    }

}