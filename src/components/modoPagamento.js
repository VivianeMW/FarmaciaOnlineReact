import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { MdCreditCard } from 'react-icons/md';
import { FaBarcode }    from 'react-icons/fa';

import '../css/cssModoPagamento.css';

export default class ModoPagamento extends Component {

    render() {
        return (
            <div className="container-list">
                <div className="elem-linha">
                    <Link to={"/Compra/Cartao"}>
                        <div className="circulo"><span><MdCreditCard className="icon-pagamento" /></span></div>
                    </Link>
                    <div className="circulo"><span><FaBarcode className="icon-pagamento" /></span></div>
                </div>
            </div>
        );
    }

}