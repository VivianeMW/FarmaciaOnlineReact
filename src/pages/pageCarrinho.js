import React, { Component } from 'react';

import Paginacao from '../components/paginacao/paginacao';

export default class PageCarrinho extends Component {

    render() {
        return (
            <Paginacao tipo={2} limite={3} />
        );
    }
}