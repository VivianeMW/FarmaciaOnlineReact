import React, { Component } from 'react';

import '../css/cssPageCadastro.css';

export default class PageCadastro extends Component {
    
    state = {
        username: '',
    };

    render() {
        const { username } = this.state;
        return (
            <div className="cadastro-main-container">
                <header>
                    <strong>Crie sua conta</strong><br/>
                    <span>Os campos com * são obrigatórios</span>
                </header>
                <hr/>
                <div className="cadastro-container">
                    <form>
                        <input
                            placeholder="Nome Completo"
                        />
                        <input
                            placeholder="CPF"
                        />
                        <input
                            placeholder="Data de nascimento"
                        />
                        <input
                            placeholder="Fone"
                        />
                        <input
                            placeholder="E-mail"
                        />
                        <input
                            placeholder="Confirmar e-mail"
                        />
                        <input
                            placeholder="Senha"
                        />
                        <input
                            placeholder="Confirmar senha"
                        />
                        <button type="submit">Criar Cadastro</button>
                    </form>
                </div>
            </div>
        );
    };

}