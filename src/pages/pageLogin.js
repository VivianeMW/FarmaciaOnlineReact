import React, { Component } from 'react';

import '../css/cssPageLogin.css';
import { Link } from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';


export default class PageLogin extends Component {
    
    static contextType = ContextoUsuario;

    state = {
        username: '',
    };

    render() {
        
        const { username } = this.state;

        return (
            <div className="login-main-container">
                <header>
                    <strong>Já sou Cliente</strong><br/>
                    <span>Os campos com * são obrigatórios</span>
                </header>
                <hr/>
                <div className="login-container">
                    <form>
                        <input
                            placeholder="E-mail"
                        />
                        <input
                            placeholder="Senha"
                        />
                        <button type="submit">Logar</button>
                    </form>
                </div>
                <hr/>
                <footer>
                    <span>Não possui conta?</span><Link to="/cadastro">Cadastre-se</Link>
                </footer>
            </div>
        );
    };

}