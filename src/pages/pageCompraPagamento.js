import React, { Component } from 'react';

import { Redirect }        from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';

import BarraConfirmacao        from '../components/barraConfirmacao';
import ModoPagamento           from '../components/modoPagamento'
import ValorTotalItensCarrinho from '../components/valorTotalItensCarrinho';

export default class PageCompraPagamento extends Component {

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
            redireciona : bRedireciona,
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
            <div>
                {this.redireciona()}
                <BarraConfirmacao nivel={1} labels={['ENDEREÇO', 'PAGAMENTO']}/>
                <div className="elem-linha">
                    <p>
                        Valor total: 
                        <ValorTotalItensCarrinho />
                    </p>
                </div>
                <ModoPagamento />
            </div>
        );
    }
}
