/*
    Cabeçalho da aplicação
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/cssHeader.css';

import { MdAccountCircle, MdAddShoppingCart, MdSearch } from 'react-icons/md';
import logo from '../img/logo.svg';

export default class Header extends Component {

    render() {
        return (
            <header id="main-header">
                <div className="div-container">
                    <div id="h-logo" className="h-header">
                        <Link to="/">
                            <img id="img-logo" src={logo}/>
                        </Link>
                    </div>
                    <div id="h-input-busca" className="h-header">
                        <div id="div-busca">
                            <input 
                                type="text" 
                                placeholder="Busca"
                            />
                            <button><MdSearch /></button>
                        </div>
                    </div>
                    <div id="h-icon-user" className="h-header">
                       <Link to={`/login`}>
                          <MdAccountCircle />
                       </Link> 
                    </div>
                    <div id="h-icon-cart" className="h-header">
                        <MdAddShoppingCart />
                    </div>
                </div>
            </header>
        );
    };
}