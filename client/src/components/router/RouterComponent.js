import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexComponent from '../index/IndexComponent';

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/">
                        <IndexComponent />
                    </Route>
                </Switch>
            </Router>
        );
    }
}