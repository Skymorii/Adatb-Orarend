import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <div id="logo">
                    <Link to="/">Zsírkréta Napló</Link>
                </div>
        
                <nav id="navlinks">
                    <ul>
                        <li>
                            <Link to="/schedules">Órarendek</Link>
                        </li>
                        <li>
                            <Link to="/classes">Osztályok</Link>
                        </li>
                        <li>
                            <Link to="/teachers">Tanárok</Link>
                        </li>
                        <li>
                            <Link to="/classrooms">Tantermek</Link>
                        </li>
                    </ul>
                </nav>
                
                <ul id="login">
                    <li>
                        <Link to="/login">Belépés</Link>
                    </li>
                </ul>
            </header>
        )
    }
}