import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from '../header/HeaderComponent';
import IndexComponent from '../index/IndexComponent';
import FooterComponent from '../footer/FooterComponent';

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/">
                        <HeaderComponent />
                        <Switch>
                            <Route exact path="/" component={IndexComponent}></Route>
                        </Switch>
                    </Route>
                </Switch>
                <FooterComponent />
            </Router>
        );
    }
}