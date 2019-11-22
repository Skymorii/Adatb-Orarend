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
        document.getElementById("username").classList.remove("badinput");
        this.setState({ username: event.target.value });
    }

    enterPassword(event) {
        event.preventDefault();
        document.getElementById("password").classList.remove("badinput");
        this.setState({ password: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await Axios.post("http://localhost:4000/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(respone => {
                console.log("Login success");
                this.setState({ redirect: <Redirect to="/admin" /> })
            })
            .catch(error => {
                console.log("Login failed");
                document.getElementById("username").classList.add("badinput");
                document.getElementById("password").classList.add("badinput");
                document.getElementById("loginfailmsg").classList.remove("badinputdisplay");
            });
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
                            Felhasználónév<br />
                            <input id="username" type="text" placeholder="Felhasználónév" onChange={this.enterUsername.bind(this)} />
                            Jelszó<br />
                            <input id="password" type="password" placeholder="Jelszó" onChange={this.enterPassword.bind(this)} />
                            <input type="submit" value="Belépés" />
                        </form>
                        <div id="loginfailmsg" className="badinputdisplay">Hibás felhasználónév vagy jelszó!</div>
                    </div>
                </div>
                {this.state.redirect}
            </main>
        );
    }
}