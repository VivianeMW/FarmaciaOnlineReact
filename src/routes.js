import React from 'react';

import { Switch, Route } from 'react-router-dom';

import PageMain     from './pages/pageMain';
import PageLogin    from './pages/pageLogin';
import PageCadastro from './pages/pageCadastro';
import PageCarrinho from './pages/pageCarrinho';
import PageProduto  from './pages/pageProduto';

const Routes = function() {
    return (
        <Switch>
            <Route exact path="/"           component={PageMain}/>
            <Route path="/pesquisa/:filtro" component={PageMain}/>
            <Route path="/login"            component={PageLogin}/>
            <Route path="/cadastro"         component={PageCadastro}/>
            <Route path="/carrinho"         component={PageCarrinho}/>
            <Route path="/produto/:id"      component={PageProduto}/>
        </Switch>
    );
}

export default Routes;