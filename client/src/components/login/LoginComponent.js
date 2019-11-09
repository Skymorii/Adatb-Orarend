import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import './login.css'

export default class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            redirect: null
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

    async handleSubmit(event) {
        event.preventDefault();
        await Axios.post("http://localhost:4000/login", {
            username: this.state.username,
            password: this.state.password})
            .then(respone => {
                console.log("Sikeres bejelentkezés");
                this.setState({redirect: <Redirect to="/admin"/>})
            })
            .catch(error => alert("Sikertelen bejelentkezés\nHibás felhasználónév vagy jelszó"))
    }

    render() {    
        return (
            <main id="loginpage">
                <div id="logintile">
                    <div id="loginheader">
                        <h1>Bejelentkezés</h1>
                    </div>
                    
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
                {this.state.redirect}
            </main>
        );
    }
}