import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { ContextoUsuario } from '../components/Session';
import Paginacao           from '../components/paginacao/paginacao';

class PagePedido extends Component {

    static contextType = ContextoUsuario;

    state = {
        user        : {},
        redireciona : false,
    }

    componentDidMount() {
        let { usuarioAutenticado } = this.context;
        let  bRedireciona = false;

        if(usuarioAutenticado == null) {
            bRedireciona = true;
        }

        this.setState({
            user : usuarioAutenticado,
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
        return (
            <div>
                {this.redireciona()}
                <Paginacao tipo={3} limite={8} />
            </div>
        );
    }
}

export default PagePedido;