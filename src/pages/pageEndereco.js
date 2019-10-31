import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { ContextoUsuario } from '../components/Session';
import Navbar              from '../components/usuario/navbar';

class PageEndereco extends Component {

    static contextType = ContextoUsuario;

    state = {
        user : {},
        endereco : {},
        redireciona : false
    }

    componentDidMount() {
        debugger
        let { usuarioAutenticado } = this.context;
        let  bRedireciona = false;

        if(usuarioAutenticado == null) {
            bRedireciona = true;
        }

        this.setState({
            user : usuarioAutenticado,
            endereco: usuarioAutenticado.endereco,
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
        const { user, endereco } = this.state;

        return (
            <div>
                {this.redireciona()}
                <header><Navbar /></header>
                <div className="container-list">
                    <h3>Dados Cadastrais</h3>
                    <hr/>
                    <h3>Endereco</h3>
                    <p><strong>ID</strong></p>
                    <p>{endereco.id}</p>
                    <p><strong>Número</strong></p>
                    <p>{endereco.numero}</p>
                    {/* 
                    {/* <p><strong>Rua</strong></p>
                    <p>{user.nome}</p>
                    <p><strong>CEP</strong></p>
                    <p>{user.email}</p>
                    <p><strong>Cidade</strong></p>
                    <p>{user.cpf}</p> */}
                    {/* <p><strong>ID</strong></p>
                    <p>{user.id}</p>
                    <h3>Contato</h3>
                    <hr/>
                    <p><strong>Telefone</strong></p>
                    <p>{user.telefone}</p>     */}
                </div>
            </div>
        );
    }
}

export default PageEndereco;