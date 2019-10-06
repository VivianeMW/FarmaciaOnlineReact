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

const LIMIT_ITENS = 8;

export default class PageMain extends Component {

    state = {
        produtos : [],
        produto  : {},
        page     : 1,
        pages    : 1
    };

    // componentDidMount() {
    //     debugger;
    //     this.carregaProdutos();
    // }

    componentDidMount() {
        this.carregaProdutos();
    };


    carregaProdutos = async function(page = 1) {
        const response = await api.get(`/Produto`);
        console.log(response.data);

        let result      = [];
        let totalPage   = Math.ceil(response.data.length/LIMIT_ITENS); 
        let count       = (page * LIMIT_ITENS) - LIMIT_ITENS;
        let delimitador = count + LIMIT_ITENS;

        for(let i = count; i < delimitador; i++) {
            if(response.data[i] != null) {
                result.push(response.data[i]);
            }
        }

        this.setState({
            produtos : result,
            pages    : totalPage,
            page
        });
    }

    adicionaLocalStorage = produto => {

        alert(produto.id)
        localStorage.setItem(produto.id, JSON.stringify(produto));
        this.setState({
            redireciona: true
        });
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
    };

}