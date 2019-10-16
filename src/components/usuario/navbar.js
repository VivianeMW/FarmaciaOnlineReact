import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <div>
                <ul className="nav-ul">
                    <li className="nav-li"><Link to={'/User'}>Perfil</Link></li>
                    <li className="nav-li"><Link to={'/User/Endereco'}>Endereco de Entrega</Link></li>
                    <li className="nav-li"><Link to={'/User/Pedido'}>Pedidos</Link></li>
                </ul>
            </div>
        );
    }
}