/*
    Cabeçalho da aplicação
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/cssHeader.css';

import { MdAccountCircle, MdAddShoppingCart, MdSearch, MdFilterList } from 'react-icons/md';

import logo                from '../img/logo.svg';
import { Redirect }        from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';

export default class Header extends Component {

    static contextType = ContextoUsuario;

    state = {
        redireciona : false,
        filtro      : {} 
    }

    trocaClasse = () => {
        let divDestacada = document.getElementById("div-caixa-oculta");
        let divOverlay   = document.getElementById("header-overlay");
        let btnIcon      = document.getElementById("btn-filtro");

        if(divDestacada.classList.contains('oculta')) {
            divDestacada.classList.remove('oculta');
            divDestacada.classList.add('destaca');
            divOverlay.classList.remove('opacidade-oculta');
            divOverlay.classList.add('opacidade-visivel');
            btnIcon.classList.add('destaca');
        } else {
            divDestacada.classList.add('oculta');
            divDestacada.classList.remove('destaca');
            divOverlay.classList.add('opacidade-oculta');
            divOverlay.classList.remove('opacidade-visivel');
            btnIcon.classList.remove('destaca');
        }
    };

    busca = () => {
        let oFiltro = {
            conteudo : '',
            filtro   : null
        };
        let radioButton = document.getElementsByName('filtro');

        for(let i = 0; i < radioButton.length; i++) {
            if(radioButton[i].checked) {
                oFiltro.filtro = radioButton[i].value;
            }
        }

        oFiltro.conteudo = document.getElementsByName('input-busca')[0].value;

        document.getElementsByName('input-busca')[0].value = '';
        
        this.setState({
            redireciona : true,
            filtro      : JSON.stringify(oFiltro)
        });
        
    };

    teclaPressionada = function(e) {
        switch (e.keyCode) {
            case 13:
                this.busca();
                break;
            default:
                break;
        }
    };

    redireciona = () => {
        if(!this.state.redireciona) {
            return;
        }

        if(!JSON.parse(this.state.filtro).conteudo) {
            return <Redirect to="/"/>;
        }

        return <Redirect to={`/pesquisa/${this.state.filtro}`}/>;
    };

    render() {
        return (
            <header id="main-header">
                <div className="div-container">
                    <div onClick={this.trocaClasse} id="header-overlay" className="opacidade-oculta"></div>
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
                                name="input-busca"
                                onKeyDown={e => this.teclaPressionada(e)}
                            />
                            {this.redireciona()}
                            <button onClick={this.busca} className="btn-input"><MdSearch /></button>
                            <button onClick={this.trocaClasse} id="btn-filtro" className="btn-ic-clicavel"><MdFilterList /></button>
                        </div>
                    </div>
                    <div id="div-caixa-oculta" className="caixa-oculta oculta">
                        <span><input type="radio" name="filtro" value="titulo" checked/>Nome</span>
                        <span><input type="radio" name="filtro" value="descricao"/>Descricao</span>
                    </div>
                    <div id="h-icon-user" className="h-header">
                       <Link to={`/login`}>
                          <MdAccountCircle />
                       </Link> 
                    </div>
                    <div id="h-icon-cart" className="h-header">
                        <Link to="/carrinho">
                            <MdAddShoppingCart />
                        </Link>
                    </div>
                </div>
            </header>
        );
    };
}