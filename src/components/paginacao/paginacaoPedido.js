import React, { Component } from 'react';

import DivVazia     from '../divVazia';
import NumberFormat from 'react-number-format';
import Navbar       from '../usuario/navbar';

export default class PaginacaoPedido extends Component {

    render() {
        const { pedidos } = this.props;

        return (
            <div>
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
                        <DivVazia mensagem={"Não há pedidos :("}/>
                    )}
                </div>
            </div>
        );
    }

}