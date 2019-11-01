import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FooterComponent extends Component {
    render() {
        return (
        <footer>
            <div id="topic">
                2019 | Órarend | Adatbázisok kötelező program
            </div>
            
            <div id="name">
                Hergert Lea
                <div className="divider"></div>
                KWCB9G
            </div>
        </footer>
        )
    }
}