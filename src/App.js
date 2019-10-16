import React, { Component }  from 'react';
import Routes from './routes';

import './css/cssStyle.css';

import Header              from './components/header';
import api                 from './services/api';
import { ContextoUsuario } from './components/Session';

class App extends Component {

  state = {
    usuarioAutenticado : null,
    pesquisar          : false,
    filtro             : null
  }

  usuarioLogin = async (user) => {

    if(typeof user === 'undefined') {
      return;
    }

    const response = await api.get(`/Usuario/login?email=${user.email}&senha=${user.senha}`);

    this.setState({
        usuarioAutenticado : response.data
    });
  }

  pesquisarAtivo = () => {
    this.setState({
      pesquisar : true
    });
  }

  pesquisarInativo = () => {
    console.log('inativo')
    this.setState({
      pesquisar : false
    });
  }

  limpaFiltro = () => {
    this.setState({
      filtro : null
    });
  }

  preencheFiltro = (filtro) => {
    this.setState({
      filtro : filtro
    });
  }

  render() {
    
    const { 
      usuarioLogin, 
      pesquisarAtivo,
      pesquisarInativo,
      preencheFiltro,
      limpaFiltro
      } = this;

    const value = {
        ...this.state,
        usuarioLogin,
        pesquisarAtivo,
        pesquisarInativo,
        preencheFiltro,
        limpaFiltro
    }

    return(
        <ContextoUsuario.Provider value={value}>
          <ContextoUsuario.Consumer> 
            {
              ({ 
                usuarioLogin, 
                usuarioAutenticado, 
                pesquisar, 
                pesquisarAtivo,
                pesquisarInativo,
                limpaFiltro,
                preencheFiltro,
                filtro
              }) => (
                <div className="App">
                  <Header {...{ 
                    usuarioAutenticado, 
                    pesquisarAtivo,
                    pesquisarInativo,
                    filtro,
                    preencheFiltro,
                    limpaFiltro 
                  }}  />

                  <Routes {...{ 
                    usuarioLogin, 
                    usuarioAutenticado, 
                    pesquisar, 
                    pesquisarAtivo 
                    }}  />
                </div>
              )
            }
          </ContextoUsuario.Consumer>
        </ContextoUsuario.Provider>
    );
  }

}

export default App;
