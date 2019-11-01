import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from '../header/HeaderComponent';
import IndexComponent from '../index/IndexComponent';
import SchedulesComponent from '../schedules/SchedulesComponent';
import ClassesComponent from '../classes/ClassesComponent';
import TeachersComponent from '../teachers/TeachersComponent';
import ClassroomsComponent from '../classrooms/ClassroomsComponent';
import LoginComponent from '../login/LoginComponent';
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
                            <Route path="/schedules" component={SchedulesComponent}></Route>
                            <Route path="/classes" component={ClassesComponent}></Route>
                            <Route path="/teachers" component={TeachersComponent}></Route>
                            <Route path="/classrooms" component={ClassroomsComponent}></Route>
                            <Route path="/login" component={LoginComponent}></Route>
                        </Switch>
                    </Route>
                </Switch>
                <FooterComponent />
            </Router>
        );
    }
}