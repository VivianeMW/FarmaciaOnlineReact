import React, { Component } from 'react';

import '../css/cssPageUserLog.css';
import { Redirect } from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';

import Navbar from '../components/usuario/navbar';

export default class PageUsuarioLog extends Component {
    
    static contextType = ContextoUsuario;

    state = {
        user : {},
        redireciona : false
    }

    componentDidMount() {
        let { usuarioAutenticado } = this.context;
        let bRedireciona = false;

        if(usuarioAutenticado == null) {
            bRedireciona = true;
        }

        this.setState({
            user : this.context.usuarioAutenticado,
            redireciona : bRedireciona
        });
    }

    componentDidUpdate() {
        let { usuarioAutenticado } = this.context;

        if(!(usuarioAutenticado == null)) {
            return
        }

        this.setState({
            redireciona : true
        });
    }

    redireciona = ()=> {
        if(!this.state.redireciona) {
            return;
        }

        return <Redirect  to={`/`} />;
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                {this.redireciona()}
                <header>
                    <Navbar />
                </header>
                <div className="container-list">
                    <h3>Dados Cadastrais</h3>
                    <hr/>
                    <p><strong>Nome Completo</strong></p>
                    <p>{user.nome}</p>
                    <p><strong>E-mail</strong></p>
                    <p>{user.email}</p>
                    <p><strong>CPF</strong></p>
                    <p>{user.cpf}</p>
                    <p><strong>ID</strong></p>
                    <p>{user.id}</p>
                    <h3>Contato</h3>
                    <hr/>
                    <p><strong>Telefone</strong></p>
                    <p>{user.telefone}</p>
                </div>
            </div>
        );
    };

}