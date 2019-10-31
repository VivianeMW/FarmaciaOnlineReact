import React, { Component } from 'react';

export default class DivVazia extends Component {

    render() {
        return (
            <div className="vazia">{this.props.mensagem}</div>
        );
    }

}