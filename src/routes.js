import React from 'react';

import { Switch, Route } from 'react-router-dom';

import App from './App';

import PageMain     from './pages/pageMain';
import PageLogin    from './pages/pageLogin';
import PageCadastro from './pages/pageCadastro';
import PageCarrinho from './pages/pageCarrinho';

const Routes = function() {
    return (
        <Switch>
            <Route exact path="/"   component={PageMain}/>
            <Route path="/login"    component={PageLogin}/>
            <Route path="/cadastro" component={PageCadastro}/>
            <Route path="/carrinho" component={PageCarrinho}/>
        </Switch>
    );
}

export default Routes;