import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <div id="logo">Zsírkréta Napló</div>
        
                <nav id="navlinks">
                    <ul>
                        <li>Órarendek</li>
                        <li>Osztályok</li>
                        <li>Tanárok</li>
                        <li>Termek</li>
                    </ul>
                </nav>
                
                <ul id="login">
                    <li>Belépés</li>
                </ul>
            </header>
        )
    }
}