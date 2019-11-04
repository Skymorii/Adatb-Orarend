import React, { Component } from 'react';
import Axios from 'axios';
import TeacherComponent from './TeacherComponent';
import './teachers.css'

export default class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        }
    }

    async fetchData(orderby="") {
        let teachers = [];
        await Axios.get(`http://localhost:4000/teachers/${orderby}`)
             .then(response => {
                 response.data.forEach(teacher => {
                    teachers.push(<TeacherComponent teacher = {teacher}/>);
                 });
             })
             .catch(error => { console.log("Error in TeacherList fetchData") });
        this.setState({ teachers: teachers });
    }

    async fetchDataDesc(orderby="") {
        let teachers = [];
        await Axios.get(`http://localhost:4000/teachers/${orderby}/desc`)
             .then(response => {
                 response.data.forEach(teacher => {
                    teachers.push(<TeacherComponent teacher = {teacher}/>);
                 });
             })
             .catch(error => { console.log("Error in TeacherList fetchDataDesc") });
        this.setState({ teachers: teachers });
    }

    async componentDidMount() {
        await this.fetchData();
    };

    async changeOrderTeacher(orderby, e) {
        e.preventDefault();
        this.setState({teachers: []});
        await this.fetchData(orderby);
    }

    async changeOrderTeacherDesc(orderby, e) {
        e.preventDefault();
        this.setState({teachers: []});
        await this.fetchDataDesc(orderby);
    }

    render() {
        return (
            <main id="teacherspage">
                <div>
                    <h1>Tanárok</h1>
                    <div id="orderbuttons">
                        <h2>Lista rendezése</h2>
                        <h3>Növekvő sorrend</h3>
                        <button onClick={(e) => this.changeOrderTeacher("pedagogus_id", e)}>Azonosító</button>
                        <button onClick={(e) => this.changeOrderTeacher("nev", e)}>Név</button>
                        <button onClick={(e) => this.changeOrderTeacher("targynev", e)}>Tárgy</button>
                        <h3>Csökkenő sorrend</h3>
                        <button onClick={(e) => this.changeOrderTeacherDesc("pedagogus_id", e)}>Azonosító</button>
                        <button onClick={(e) => this.changeOrderTeacherDesc("nev", e)}>Név</button>                        
                        <button onClick={(e) => this.changeOrderTeacherDesc("targynev", e)}>Tárgy</button>                        
                    </div>
                    <h2>Tanárok listája</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Azonosító</th>
                                <th>Név</th>
                                <th>Tárgy</th>
                            </tr>
                            {this.state.teachers}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}