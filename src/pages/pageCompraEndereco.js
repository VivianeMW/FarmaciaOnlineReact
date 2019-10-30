import React, { Component } from 'react';

import { Redirect, Link } from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';
import BarraConfirmacao from '../components/barraConfirmacao';

import '../css/cssPageCompra.css';

export default class PageCompraEndereco extends Component {

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
            user : usuarioAutenticado,
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
        return (
            <div className="container-list">
                {this.redireciona()}
                <BarraConfirmacao nivel={0} labels={['ENDEREÇO', 'PAGAMENTO']}/>
                <div className="cadastro-main-container">
                    <header>
                        <strong>Informe o endereço</strong><br/>
                        <span>Os campos com * são obrigatórios</span>
                    </header>
                    
                    <hr/>
                    <div className="cadastro-container">
                        <form>
                            <input
                                id="cidade"
                                placeholder="Cidade"
                            />
                            <input
                                id="bairro"
                                placeholder="Bairro"
                            />
                            <input
                                id="numero"
                                placeholder="Numero"
                            />
                            <input
                                id="complemento"
                                placeholder="Complemento"
                            />
                            <input
                                id="cep"
                                placeholder="CEP"
                            />
                            <Link to={"/Compra/Pagamento"}>
                                <button type="button">Continuar</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}