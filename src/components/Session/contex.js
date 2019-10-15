import React from 'react';

const ContextoUsuario = React.createContext({
    usuarioAutenticado : null,
    usuarioLogin : () => {}
});

export default ContextoUsuario;