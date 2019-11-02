import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css'

export default class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    enterUsername(event) {
        event.preventDefault();
        this.setState({ username: event.target.value });
    }

    enterPassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {    
        return (
            <main id="loginpage">
                <div id="logintile">
                    <h1>Bejelentkezés</h1>
                    <div id="loginform">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            Felhasználónév<br/>
                            <input type="text" placeholder="Felhasználónév" onChange={this.enterUsername.bind(this)} />
                            Jelszó<br/>
                            <input type="password" placeholder="Jelszó" onChange={this.enterPassword.bind(this)} />
                            <input type="submit" value="Belépés" />
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}