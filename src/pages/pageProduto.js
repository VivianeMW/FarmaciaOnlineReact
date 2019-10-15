import React, { Component } from 'react';
import api from '../services/api';


import '../css/cssPageProduto.css';
import ImgReme             from '../img/reme1.jpg';
import { Redirect }        from 'react-router-dom';
import { ContextoUsuario } from '../components/Session';

export default class Produto extends Component {

    static contextType = ContextoUsuario;

    state = {
        produto : {},
        redireciona : false
    };
    
    async componentDidMount() {

        const { id } = this.props.match.params;

        const response = await api.get(`/Produto/${id}`);

        // console.log(response.data);

        this.setState({
            produto: response.data
        });
    };

    adicionaLocalStorage = () => {
        const { produto } = this.state;

        localStorage.setItem(produto.id, JSON.stringify(produto));
        this.setState({
            redireciona: true
        });
    };

    redireciona = () => {
        if(this.state.redireciona) {
            return <Redirect to="/carrinho"/>;
        }
    };

    render() {
        const { produto } = this.state;

        return (
            <div className="info-produto">
                <div className="img-div-pr">
                    <img id="img-reme-grande" src={ImgReme}/>
                </div>
                <div className="dados-produto">
                    <header><h1>{produto.titulo}</h1></header>
                    <h2>Bula</h2>
                    <p>{produto.descricao}</p>
                    {this.redireciona()}
                    <button onClick={this.adicionaLocalStorage} className="btn-compra">ADD CARRINHO</button>
                </div>
            </div>
        );
    }
}