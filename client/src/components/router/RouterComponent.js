import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from '../header/HeaderComponent';
import IndexComponent from '../index/IndexComponent';
import SchedulesComponent from '../schedules/SchedulesComponent';
import ClassesComponent from '../classes/ClassesComponent';
import TeacherList from '../teachers/TeacherList';
import LoginComponent from '../login/LoginComponent';
import FooterComponent from '../footer/FooterComponent';
import ClassroomList from '../classrooms/ClassroomList';

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <HeaderComponent />
                <Switch>
                    <Route path="/">
                        <Switch>
                            <Route exact path="/" component={IndexComponent}></Route>
                            <Route path="/schedules" component={SchedulesComponent}></Route>
                            <Route path="/classes" component={ClassesComponent}></Route>
                            <Route path="/teachers" component={TeacherList}></Route>
                            <Route path="/classrooms" component={ClassroomList}></Route>
                            <Route path="/login" component={LoginComponent}></Route>
                        </Switch>
                    </Route>
                </Switch>
                <FooterComponent />
            </Router>
        );
    }
}