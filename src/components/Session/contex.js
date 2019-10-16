import React from 'react';

const ContextoUsuario = React.createContext({
    usuarioAutenticado : null,
    pesquisar          : false,
    filtro             : null,
    usuarioLogin       : (user) => {},
    pesquisarAtivo     : () => {},
    pesquisarInativo   : () => {},
    preencheFiltro     : (filtro) => {},
    limpaFiltro        : () => {}
});

export default ContextoUsuario;