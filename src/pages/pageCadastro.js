import React, { Component } from 'react';

import '../css/cssPageCadastro.css';

import { ContextoUsuario } from '../components/Session';
import api from '../services/api';

export default class PageCadastro extends Component {
    
    static contextType = ContextoUsuario;

    state = {
        username: '',
    };

    cadastrar = async () => {

        // if(this.possuiCamposVazios()) {
        //     return;
        // }

        let inpNomeComp = document.getElementById("nomecomp");
        let inpCpf      = document.getElementById("cpf");
        let inpDataNasc = document.getElementById("datanasc");
        let inpFone     = document.getElementById("fone");
        let inpEmail    = document.getElementById("email");
        let inpSenha    = document.getElementById("senha");

        let dtaForm = this.getDataIsoFormat(inpDataNasc.value);

        let response = await api.post('/Usuario', { 
               
                nome           : inpNomeComp.value,
                cpf            : inpCpf.value,
                telefone       : inpFone.value,
                email          : inpEmail.value,
                senha          : inpSenha.value,
                datanascimento : dtaForm,
                administrador  : false,
                endereco       : null,
                cartao         : null
                
            });

        console.log(response);

        
        alert('cadastro efetuado')
    }

    getDataIsoFormat = (data) => {
        
        let dia = data.split("/")[0],
            mes = data.split("/")[1],
            ano = data.split("/")[2];

        let dataFormatada = new Date(ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2));
        return dataFormatada.toISOString();
    }

    possuiCamposVazios = () => {
        let campos = document.querySelectorAll('form input');

        for(let i = 0; i < campos.length; i++) {
            if(!campos[i].value) {
                alert("Algum campo se encontra em branco");
                return true;
            }
        }

        return false;
    }

    render() {
        const { username } = this.state;
        
        return (
            <div className="form-main-container">
                <header>
                    <strong>Crie sua conta</strong><br/>
                    <span>Os campos com * são obrigatórios</span>
                </header>
                <hr/>
                <div className="form-container">
                    <form>
                        <input
                            id="nomecomp"
                            placeholder="Nome Completo"
                        />
                        <input
                            id="cpf"
                            placeholder="CPF"
                        />
                        <input
                            id="datanasc"
                            placeholder="Data de nascimento"
                        />
                        <input
                            id="fone"
                            placeholder="Fone"
                        />
                        <input
                            id="email"
                            placeholder="E-mail"
                        />
                        <input
                            placeholder="Confirmar e-mail"
                        />
                        <input
                            id="senha"
                            placeholder="Senha"
                        />
                        <input
                            placeholder="Confirmar senha"
                        />
                        <button className="btn azul-roxo clicavel" type="button" onClick={this.cadastrar}>Criar Cadastro</button>
                    </form>
                </div>
            </div>
        );
    };

}