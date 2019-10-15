import React, { Component }  from 'react';
import Routes from './routes';

import './css/cssStyle.css';

import Header              from './components/header';
import { ContextoUsuario } from './components/Session';

class App extends Component {

  state = {
    usuarioAutenticado : {}
  }

  usuarioLogin = () => {
    this.setState({
        usuarioAutenticado : {
          id : '3'
        }
    });
  }

  render() {
    
    const { usuarioLogin } = this;

    const value = {
        ...this.state,
        usuarioLogin
    }

    return(
        <ContextoUsuario.Provider value={value}>
          <ContextoUsuario.Consumer> 
            {
              ({ usuarioLogin, usuarioAutenticado }) => (
                <div className="App">
                  <Header {...{ usuarioAutenticado }}  />
                  <Routes {...{ usuarioLogin, usuarioAutenticado }}  />
                </div>
              )
            }
          </ContextoUsuario.Consumer>
        </ContextoUsuario.Provider>
    );
  }

}

export default App;
