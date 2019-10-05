/*
    Esta é a página principal da aplicação
*/
import React, { Component } from 'react';

import '../css/cssPageMain.css';

import api from '../services/api';
import Reme from '../img/reme1.jpg';
import { Link } from 'react-router-dom';
// import FormatCurrency from 'react-format-currency';
// import { setState } from 'expect/build/jestMatchersObject';

export default class PageMain extends Component {

    state = {
        produtos : [],
        produto : {}
    };

    // componentDidMount() {
    //     debugger;
    //     this.carregaProdutos();
    // }

    componentDidMount() {
        this.loadProducts();
    };


    loadProducts = async function() {
        const response = await api.get(`Produto`);
        console.log(response.data);

        this.setState({
            produtos : response.data
        });
    }

    adicionaLocalStorage = produto => {
        // const { produto } = this.state;

        alert(produto.id)
        localStorage.setItem(produto.id, JSON.stringify(produto));
        this.setState({
            redireciona: true
        });
    };

    render() {
        const { produtos } = this.state;
        return (
            <div className="main-container">
                {produtos.length > 0 ? (
                    <ul> 
                        {produtos.map(produto =>{
                            return (
                                <li key={produto.id}>
                                    <div className="div-card">
                                        <header>
                                            <Link to={`/produto/${produto.id}`}>
                                                <img id="img-reme" src={Reme}/>
                                            </Link>
                                            {/* <Link to={`produto/${produto.id}`}></Link> */}
                                        </header>
                                        <hr/>
                                        <footer>
                                            <strong>{produto.titulo}</strong>
                                            <p>{produto.descricao}</p>
                                            <div className="footer-card">
                                                <span>{produto.preco}</span>
                                                {/* {this.state.produto = produto} */}
                                                <button onClick={ e =>this.adicionaLocalStorage(produto)} className="btn-compra">ADD CARRINHO</button>
                                            </div>
                                        </footer>
                                    </div>
                                </li>
                            );
                        })}     
                    </ul>
                ) : (
                    <div className="empty">
                        Acabou :(
                    </div>
                )}
            </div>
        );
    };

}