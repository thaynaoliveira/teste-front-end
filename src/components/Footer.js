import React, { Component } from 'react';

export default class Footer extends Component {

    abrirLinkedin(e){
        window.open('https://www.linkedin.com/in/thayn%C3%A1-oliveira-59b984115/', '_blank');
    }
    render() {
        return (
            <div className="footer">
                <img src="../images/icasei-logo-branco.svg" />
                <div className="perfil" onClick={(e) => this.abrirLinkedin(e)}>
                    <img src="../images/perfil.png" />
                    <h1>Thayná Oliveira</h1>
                </div>
            </div>
        );
    }
}