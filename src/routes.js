import React from 'react';

import { Switch, Route } from 'react-router-dom';

import PageMain           from './pages/pageMain';
import PageLogin          from './pages/pageLogin';
import PageCadastro       from './pages/pageCadastro';
import PageCarrinho       from './pages/pageCarrinho';
import PageProduto        from './pages/pageProduto';
import PageUsuarioLog     from './pages/pageUsuarioLog';
import PageEndereco       from './pages/pageEndereco';
import PagePedido         from './pages/pagePedido';
import PageCompraEndereco from './pages/pageCompraEndereco';
import PageCompraPagament from './pages/pageCompraPagamento';
import PageCompraCartao   from './pages/pageCompraCartao';

const Routes = function() {
    return (
        <Switch>
            <Route exact path="/"                 component={PageMain}/>
            <Route path="/pesquisa/:filtro"       component={PageMain}/>
            <Route path="/login"                  component={PageLogin}/>
            <Route path="/cadastro"               component={PageCadastro}/>
            <Route path="/carrinho"               component={PageCarrinho}/>
            <Route path="/produto/:id"            component={PageProduto}/>
            <Route exact path="/User"             component={PageUsuarioLog}/>
            <Route exact path="/User/Endereco"    component={PageEndereco}/>
            <Route exact path="/User/Pedido"      component={PagePedido}/>
            <Route exact path="/Compra/Endereco"  component={PageCompraEndereco}/> 
            <Route exact path="/Compra/Pagamento" component={PageCompraPagament}/> 
            <Route exact path="/Compra/Cartao"    component={PageCompraCartao}/> 
        </Switch>
    );
}

export default Routes;