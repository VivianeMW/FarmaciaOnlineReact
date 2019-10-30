import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';
import BarraConfirmacao from '../components/barraConfirmacao';
import NumberFormat     from 'react-number-format';

export default class PageCompraCartao extends Component {

    static contextType = ContextoUsuario;

    state = {
        user : {},
        redireciona : false,
        produtos : []
    }
    
    componentDidMount() {
        let { usuarioAutenticado } = this.context;
        let bRedireciona = false;

        let aProdutos = [],
        chaves        = Object.keys(localStorage),
        i             = chaves.length;

        while( i-- ) {
            aProdutos.push(JSON.parse(localStorage.getItem(chaves[i])));
        }    

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
    
    getPrecoTotal = () => {
        const { produtos } = this.state;
        let preco = 0;

        for(let i = 0; i < produtos.length; i++) {
            if(isNaN(produtos[i].preco)) {
                continue;
            }
            preco += produtos[i].preco;
        }

        return preco;
    };

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
                        <NumberFormat 
                            value={this.getPrecoTotal()} 
                            displayType={'text'}
                            prefix={'R$'}
                            decimalSeparator={','}
                            decimalScale={2}
                            fixedDecimalScale={true}
                        />
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
                            <button type="button" className="btn azul-roxo clicavel">Continuar</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}