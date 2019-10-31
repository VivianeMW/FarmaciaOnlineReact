import React, { Component } from 'react';

import DivVazia     from '../divVazia';
import NumberFormat from 'react-number-format';
import { Link }     from 'react-router-dom';
import Reme         from '../../img/reme1.jpg';

export default class PaginacaoMain extends Component {

    state = {
        produtos : []
    }

    componentDidMount() {
        this.setState({
            produtos : this.props.produtos
        });
    }

    adicionaLocalStorage = produto => {

        localStorage.setItem(produto.id, JSON.stringify(produto));
        this.setState({
            redireciona: true
        });
    };

    render() {

        const { produtos } = this.props;

        return (
            <div className="container-fundo">
                {produtos.length > 0 ? (
                    <ul className="lista-4x2"> 
                        {produtos.map(produto =>{
                            return (
                                <li key={produto.id}>
                                    <div className="div-card">
                                        <Link to={`/produto/${produto.id}`}>
                                            <header>
                                                <img id="img-reme" src={Reme}/>
                                            </header>
                                        </Link>
                                        <hr/>
                                        <footer>
                                            <strong>{produto.titulo}</strong>
                                            <p>{produto.descricao}</p>
                                            <div className="footer-card">
                                                <span>
                                                    <NumberFormat 
                                                        value={produto.preco} 
                                                        displayType={'text'}
                                                        prefix={'R$'}
                                                        decimalSeparator={','}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                    />
                                                </span>
                                                {/* {this.state.produto = produto} */}
                                                <Link to={"/Compra/Endereco"}>
                                                    <button onClick={ e =>this.adicionaLocalStorage(produto)} className="btn azul-roxo clicavel">COMPRAR</button>
                                                </Link>
                                            </div>
                                        </footer>
                                    </div>
                                </li>
                            );
                        })}     
                    </ul>
                ): (
                    <DivVazia mensagem={"Acabou :("}/>
                )}
            </div>
        );
    }

}