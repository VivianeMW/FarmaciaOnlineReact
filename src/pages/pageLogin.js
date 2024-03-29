import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';

import '../css/cssPageLogin.css';

export default class PageLogin extends Component {
    
    static contextType = ContextoUsuario;

    state = {
        user       : {},
        username   : '',
        redireciona: false
    };

    logar = () => {

        const { usuarioLogin } = this.context;

        let iEmail = document.getElementById("email");
        let iSenha = document.getElementById("senha");

        if(!iEmail.value) {
            alert('nada no input email');
            return;
        }

        if(!iSenha.value) {
            alert('nada no input senha');
            return;
        }

        let user = {
            email : iEmail.value,
            senha : iSenha.value
        };

        usuarioLogin(user);

        this.setState({
            redireciona : true
        })
    }

    redireciona = () => {
        if(!this.state.redireciona) {
            return;
        }

        return <Redirect to={`/`}/>;
    }

    render() {
        
        return (
            <div className="form-main-container">
                {this.redireciona()}
                <header>
                    <strong>Já sou Cliente</strong><br/>
                    <span>Os campos com * são obrigatórios</span>
                </header>
                <hr/>
                <div className="form-container">
                    <form>
                        <input
                            id="email"
                            placeholder="E-mail"
                        />
                        <input
                            id="senha"
                            placeholder="Senha"
                        />
                        <button 
                            type="button" 
                            onClick={this.logar} 
                            className="btn azul-roxo clicavel"
                        >
                            Logar
                        </button>
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