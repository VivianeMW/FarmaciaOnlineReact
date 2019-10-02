/*
    Esta é a página principal da aplicação
*/
import React, { Component } from 'react';

import '../css/cssPageMain.css';

// import api from '.'

export default class PageMain extends Component {

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
                descricao: "asasasasasasasasasasasasasasasasasasasasas",
                preco    : 10
            },
            {
                img      : "Andrew",
                titulo   : "Nome do Produto",
                descricao: "asasasasasasasasasasasasasasasasasasasasas",
                preco    : 10
            },
            {
                img      : "Andrew",
                titulo   : "Nome do Produto",
                descricao: "asasasasasasasasasasasasasasasasasasasasas",
                preco    : 10
            },
            {
                img      : "Andrew",
                titulo   : "Nome do Produto",
                descricao: "asasasasasasasasasasasasasasasasasasasasas",
                preco    : 10
            },
        ],
    };

    render() {
        const { produtos } = this.state;
        return (
            <div className="main-container">
                {produtos.length > 0 ? (
                    <ul> 
                        {produtos.map(produto =>{
                            return (
                                <li key={produto._id}>
                                    <div className="div-card">
                                        <header>
                                            {produto.img}
                                            <button className="btn-circle">+</button>
                                        </header>
                                        <footer>
                                            <strong>{produto.titulo}</strong>
                                            <p>{produto.descricao}</p>
                                            <div className="footer-card">
                                                <span>{produto.preco}</span>
                                                <button className="btn-compra">Compra</button>
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