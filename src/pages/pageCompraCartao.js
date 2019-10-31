import React, { Component } from 'react';

import { Redirect, Link }          from 'react-router-dom';
import { ContextoUsuario }   from '../components/Session';
import BarraConfirmacao      from '../components/barraConfirmacao';
import ValoTotaItensCarrinho from '../components/valorTotalItensCarrinho';

export default class PageCompraCartao extends Component {

    static contextType = ContextoUsuario;

    state = {
        user : {},
        redireciona : false,
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
        return(
            <div className="container-list">
                {this.redireciona()}
                <BarraConfirmacao nivel={1} labels={['ENDEREÇO', 'PAGAMENTO']}/>
                <div className="elem-linha">
                    <p>
                        Valor total: 
                        <ValoTotaItensCarrinho />
                    </p>
                </div>
                
                <div className="form-main-container">
                    <header>
                        <strong>Pagar com um cartao</strong><br/>
                        <span>Os campos com * são obrigatórios</span>
                    </header>
                    
                    <hr/>
                    <div className="form-container">
                        <form>
                            <input
                                id="ncartao"
                                placeholder="Número cartão"
                            />
                            <input
                                id="nometitular"
                                placeholder="Nome titular"
                            />
                            <div className="elem-linha">
                                <input
                                    id="validade"
                                    className="input-small"
                                    placeholder="Validade"
                                />  
                                <div className="caixa-preenchimento-small"></div>
                                <input
                                    id="codseguranca"
                                    className="input-small"
                                    placeholder="Cod. de segurança"
                                />  
                            </div>
                            <label>Parcelamento</label>
                            <input
                                id="pacelamento"
                                placeholder="Em quantas parcelas"
                            />  
                            <Link to={"/"}>
                                <button type="button" className="btn azul-roxo clicavel">Continuar</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}