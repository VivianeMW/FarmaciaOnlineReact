import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import { ContextoUsuario } from '../components/Session';
import Navbar              from '../components/usuario/navbar';


class PagePedido extends Component {

    static contextType = ContextoUsuario;

    state = {
        user : {},
        pedido : [
            {
                data: '25/08/2019',
                nPedido: '02368461',
                preco: 104,
                staus: 'entregue'
            },
            {
                data: '25/08/2019',
                nPedido: '02368461',
                preco: 104,
                staus: 'entregue'
            },
            {
                data: '25/08/2019',
                nPedido: '02368461',
                preco: 104,
                staus: 'entregue'
            }
        ],
        redireciona : false
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
    }

    redireciona = () => {
        if(!this.state.redireciona) {
            return;
        }

        return <Redirect to={"/"}/>
    }

    render() {
        const { user, pedido } = this.state;

        return (
            <div>
                {this.redireciona()}
                <header><Navbar /></header>
                <div className="container-list">
                    <h3>Pedidos Realizados</h3>
                    {pedido.length>0 ? (
                        <ul>
                            {pedido.map(pedido => {
                                return (
                                    <li key={pedido._id}>
                                        <div className="container-list">
                                            <hr/>
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
                                            <p><strong>Status:</strong>{pedido.staus}</p>
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
            </div>
        );
    }
}

export default PagePedido;