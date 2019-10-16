/*
    Esta é a página principal da aplicação
*/
import React, { Component } from 'react';

import '../css/cssPageMain.css';

import api                 from '../services/api';
import Reme                from '../img/reme1.jpg';
import { Link }            from 'react-router-dom';
import NumberFormat        from 'react-number-format';
import { ContextoUsuario } from '../components/Session';

const LIMIT_ITENS = 8;

export default class PageMain extends Component {

    static contextType = ContextoUsuario;

    state = {
        produtos : [],
        produto  : {},
        page     : 1,
        pages    : 1,
        filtrar  : false
    };

    componentDidMount() {
        const { usuarioLogin, pesquisar, pesquisarInativo } = this.context;

        usuarioLogin();
        // pesquisarAtivo();

        const tet = setInterval(pesquisarInativo, 1000);


        this.carregaProdutos();
    };

    componentDidUpdate() {
        const { pesquisar, pesquisarInativo } = this.context;

        if(!pesquisar) {
            return;
        }


        this.carregaProdutos();
    };

    carregaProdutos = async function(page = 1) {
        let response = null;

        console.log("page:" + page);
        // console.log(response.data);
        // console.log('filtro: ' + JSON.parse(this.props.match.params.filtro));

        if(typeof this.context.filtro === 'object') {
            response = await api.get(`/Produto`);
        } else {
            let oFiltro = JSON.parse(this.context.filtro);
            response = await api.get(`/Produto/conteudo=${oFiltro.conteudo}&filtro=${oFiltro.filtro}`);
        }

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
            page,
        });

    }

    adicionaLocalStorage = produto => {

        localStorage.setItem(produto.id, JSON.stringify(produto));
        this.setState({
            redireciona: true
        });
    };

    nextPage = () => {
        const { pesquisar, pesquisarInativo } = this.context;
        const { page, pages } = this.state;

        if(pesquisar) {
            pesquisarInativo();
        }

        if(page == pages) {
            return;
        }

        const nPagina = page + 1;

        this.carregaProdutos(nPagina);
    };

    prevPage = () => {
        const { pesquisar, pesquisarInativo } = this.context;
        const { page } = this.state;

        if(pesquisar) {
            pesquisarInativo();
        }

        if(page == 1) {
            return;
        }

        const nPagina = page - 1;

        this.carregaProdutos(nPagina);
    };
    
    render() {
        const { produtos, page, pages } = this.state;
        
        const { authuser } = this.props;
        return (
            <div className="main-container">
                {produtos.length > 0 ? (
                    <ul> 
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