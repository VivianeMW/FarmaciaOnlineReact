import React, { Component } from 'react';

import api                 from '../../services/api';
import { ContextoUsuario } from '../Session';

import PaginacaoMain     from './paginacaoMain';
import PaginacaoCarrinho from './paginacaoCarrinho/paginacaoCarrinho';
import PaginacaoPedido   from './paginacaoPedido';

import '../../css/cssPaginacao.css';

export default class Paginacao extends Component {

    static contextType = ContextoUsuario;

    state = {
        elemMostra: [],
        page     : 1,
        pages    : 1,
        atualizar : false
    }

    componentDidMount() {
        const { tipo } = this.props;

        switch(tipo) {
            case 1://paginacao main
                let { pesquisarInativo } = this.context;
                let tet = setInterval(pesquisarInativo, 1000);
                break;
        }

        debugger;
        this.carregaProdutos();
    }

    carregaProdutos = async function(page = 1) {
        debugger
        const { tipo, limite } = this.props;
        const LIMIT_ITENS      = limite;
        let response           = null;
        let elementos          = [];

        switch(tipo) {
            case 1://paginacao da pagina principal
                if(typeof this.context.filtro === 'object') {
                    response = await api.get(`/Produto`);
                } else {
                    let oFiltro = JSON.parse(this.context.filtro);
                    response = await api.get(`/Produto/conteudo=${oFiltro.conteudo}&filtro=${oFiltro.filtro}`);
                }
                elementos = response.data;
                break;
            case 2://paginacao da pagina de carrinho
                let chaves  = Object.keys(localStorage);
                let qChaves = chaves.length;//quantidade de chaves
                while( qChaves-- ) {
                    elementos.push(JSON.parse(localStorage.getItem(chaves[qChaves])));
                }
                break;
            case 3://paginacao da pagina de pedido
                let { usuarioAutenticado } = this.context;
                
                if(usuarioAutenticado == null) {
                    return;
                }
                response  = await api.get(`/Pedido/pedidos?usuid=${usuarioAutenticado.id}`);
                elementos = response.data;
                break;                
        }
 
        // response = this.state.elementos;

        let result      = [];
        let totalPage   = Math.ceil(elementos.length/LIMIT_ITENS); 
        let count       = (page * LIMIT_ITENS) - LIMIT_ITENS;
        let delimitador = count + LIMIT_ITENS;
       
        for(let i = count; i < delimitador; i++) {
            if(elementos[i] != null) {
                result.push(elementos[i]);
            }
        }

        debugger

        this.setState({
            elemMostra : result,
            pages      : totalPage,
            page,
        });

    }

    componentDidUpdate() {
        const { tipo } = this.props;

        switch(tipo) {
            case 1://pagina main
                let { pesquisar, pesquisarInativo } = this.context;
                if(!pesquisar) {
                    return;
                }
                break;
            case 2://page carrinho
                if(!this.state.atualizar) {
                    return;
                }
        
                this.setState({
                    atualizar : false
                });
                break; 
            case 3://page pedido
                return;       
        }

        this.carregaProdutos();
    };

    onChildChanged(bool) {
        this.setState({
            atualizar : bool
        });
    }

    renderPaginacao = () => {
        const { tipo }       = this.props;
        const { elemMostra } = this.state;

        switch(tipo) {
            case 1://paginacao da pagina principal
                return <PaginacaoMain produtos={elemMostra}/>;
            case 2://paginacao da pagina carrinho
                return <PaginacaoCarrinho produtos={elemMostra} callbackParent={(bool) => this.onChildChanged(bool)} />;
            case 3://paginacao da pagina pedido
                return <PaginacaoPedido pedidos={elemMostra}/>;
        }
    }

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

        const { elemMostra, page, pages } = this.state;

        return (
            <div>
                {this.renderPaginacao()}
                {elemMostra.length > 0? (
                    <footer className="rodape">
                        <div className="paginacao">
                            <button 
                                disabled={page == 1}   
                                onClick={this.prevPage}
                                className="btn azul-roxo clicavel"
                            >
                                Anterior
                            </button>
                            <button 
                                disabled={page == pages} 
                                onClick={this.nextPage}
                                className="btn azul-roxo clicavel"
                            >
                                Proximo
                            </button>
                        </div>
                    </footer>
                ) : ""}
            </div>
        );
    }
}