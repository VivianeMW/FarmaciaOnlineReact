import React from 'react';

import { Switch, Route } from 'react-router-dom';

import App from './App';

import PageMain     from './pages/pageMain';
import PageLogin    from './pages/pageLogin';
import PageCadastro from './pages/pageCadastro';

const Routes = function() {
    return (
        <Switch>
            <Route exact path="/"   component={PageMain}/>
            <Route path="/login"    component={PageLogin}/>
            <Route path="/cadastro" component={PageCadastro}/>
        </Switch>
    );
}

export default Routes;