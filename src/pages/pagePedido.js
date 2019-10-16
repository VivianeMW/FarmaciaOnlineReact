import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import api          from '../services/api';

import { ContextoUsuario } from '../components/Session';
import Navbar              from '../components/usuario/navbar';

const LIMIT_ITENS = 8;

class PagePedido extends Component {

    static contextType = ContextoUsuario;

    state = {
        user        : {},
        pedidos     : [],
        redireciona : false,
        page        : 1,
        pages       : 1,
    }

    componentDidMount() {
        let { usuarioAutenticado } = this.context;
        let  bRedireciona = false;

        if(usuarioAutenticado == null) {
            bRedireciona = true;
        }

        this.setState({
            user : usuarioAutenticado,
            redireciona : bRedireciona
        });

        this.carregaPedidos();
    }

    carregaPedidos = async (page = 1) => {
        let response =  null;
        let { usuarioAutenticado } = this.context;

        if(usuarioAutenticado == null) {
            return;
        }

        debugger;
        response = await api.get(`/Pedido/pedidos?usuid=${usuarioAutenticado.id}`);

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
            pedidos : result,
            pages   : totalPage,
            page,
        });
    }

    redireciona = () => {
        if(!this.state.redireciona) {
            return;
        }

        return <Redirect to={"/"}/>
    }

    nextPage = () => {
        const { page, pages } = this.state;

        if(page == pages) {
            return;
        }

        const nPagina = page + 1;

        this.carregaPedidos(nPagina);
    };

    prevPage = () => {
        const { page } = this.state;

        if(page == 1) {
            return;
        }

        const nPagina = page - 1;

        this.carregaPedidos(nPagina);
    };

    render() {
        const { user, pedidos, page, pages } = this.state;

        return (
            <div>
                {this.redireciona()}
                <header><Navbar /></header>
                <div className="container-list">
                    <h3>Pedidos Realizados</h3>
                    {pedidos.length>0 ? (
                        <ul>
                            {pedidos.map(pedido => {
                                return (
                                    <li key={pedido._id}>
                                        <div className="container-list">
                                            <hr/>
                                            <p><strong>ID:</strong>{pedido.id}</p>
                                            <p><strong>Data:</strong>{pedido.data}</p>
                                            <p><strong>Nº pedido:</strong>{pedido.nPedido}</p>
                                            <p>
                                                <strong>Preço:</strong>
                                                <span>
                                                    <NumberFormat
                                                        value={pedido.preco}
                                                        displayType={'text'}
                                                        prefix={'R$'}
                                                        decimalSeparator={','}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                    />
                                                </span>
                                            </p>
                                            <p><strong>Status:</strong>{pedido.status}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ):(
                        <div className="empty">
                            Acabou :(
                        </div>
                    )}
                </div>
                {pedidos.length > 0? (
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

export default PagePedido;