import React, { Component } from 'react';

import '../css/cssBarraConfirmacao.css';

export default class BarraConfirmacao extends Component {

    state = {
        labels : []
    }

    componentDidMount() {
        this.nivelConfirmacao(this.props.nivel);
        this.setState({
            labels : this.props.labels
        });
    }

    nivelConfirmacao = function (nivel = 0) {
        let elemSvg = document.querySelectorAll('polyline');

        switch(nivel) {
            case 0:
                elemSvg[0].classList.add('oculta');
                elemSvg[1].classList.add('oculta');
                this.atualizaBarraProgresso(5);
                break;
            case 1:
                elemSvg[0].classList.remove('oculta');
                this.atualizaBarraProgresso(50);
                break;
            case 2:
                elemSvg[0].classList.remove('oculta');
                elemSvg[1].classList.remove('oculta');
                this.atualizaBarraProgresso(100);
                break;
        }
    }

    atualizaBarraProgresso = function (porcentagem = 0) {
        const porc = porcentagem;

        let elem      = document.querySelector('.div-barra');
        let intervalo = setInterval(frame, 10);
        let comp      = 1;
        function frame() {
            if(comp >= porc) {
                clearInterval(intervalo);
            } else {
                comp++;
                elem.style.width = comp + '%';
            }
        }
    }

    render() {

        const { labels } = this.state;

        return (
            <div>
                <div className="elem-linha">
                    <svg className="elem-svg circulo-esquerdo">
                        <circle cx="50" cy="50" r="20" stroke="#737eff" stroke-width="5" fill="white" fill-opacity="0" />
                        <polyline className="oculta"  points="45,50 47,55 57,44" style={{fillOpacity:0, stroke: 'red', strokeWidth:4 }} />
                        Desculpe, seu navegador não suporta svg.
                    </svg>
                    <div className="div-progresso">
                        <div className="div-barra"></div>
                    </div>
                    <svg className="elem-svg circulo-direito" id="vsg" height="105" width="100">
                        <circle cx="50" cy="50" r="20" stroke="#737eff" stroke-width="5" fill="white" fill-opacity="0" />
                        <polyline className="oculta"  points="45,50 47,55 57,44" style={{fillOpacity:0, stroke: 'red', strokeWidth:4 }} />
                        Desculpe, seu navegador não suporta svg.
                    </svg>
                    
                </div>
                <div>
                    {labels.length > 0 ?(
                        <div className="elem-linha">
                            {labels.map(label =>{
                                return(
                                    <p key={label._id}>{label}</p>
                                );
                            })}
                        </div>
                    ): (
                        <div></div>
                    )}
                </div>
            </div>
        );
    }
}