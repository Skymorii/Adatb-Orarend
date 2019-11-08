import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from '../header/HeaderComponent';
import IndexComponent from '../index/IndexComponent';
import ScheduleList from '../schedules/ScheduleList';
import ClassList from '../classes/ClassList';
import TeacherList from '../teachers/TeacherList';
import ClassroomList from '../classrooms/ClassroomList';
import LoginComponent from '../login/LoginComponent';
import AdminComponent from '../admin/AdminComponent';
import FooterComponent from '../footer/FooterComponent';

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <HeaderComponent />
                <Switch>
                    <Route path="/">
                        <Switch>
                            <Route exact path="/" component={IndexComponent}></Route>
                            <Route path="/schedules" component={ScheduleList}></Route>
                            <Route path="/classes" component={ClassList}></Route>
                            <Route path="/teachers" component={TeacherList}></Route>
                            <Route path="/classrooms" component={ClassroomList}></Route>
                            <Route path="/login" component={LoginComponent}></Route>
                            <Route path="/admin" component={AdminComponent}></Route>
                        </Switch>
                    </Route>
                </Switch>
                <FooterComponent />
            </Router>
        );
    }
}