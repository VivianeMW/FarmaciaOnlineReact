/*
    Esta é a página principal da aplicação
*/
import React, { Component } from 'react';

import Paginacao from '../components/paginacao/paginacao';

export default class PageMain extends Component {

    render() {
        return (
          <Paginacao tipo={1} limite={8}/>
        );
    };

}