import React, { Component } from 'react';
import Axios from 'axios';
import TeacherComponent from './TeacherComponent';

export default class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        }
    }

    async fetchData(orderBy = "") {
        let teachers = [];
        await Axios.get(`http://localhost:4000/teachers/${orderBy}`)
            .then(response => {
                response.data.forEach(teacher => {
                    teachers.push(<TeacherComponent teacher={teacher} />);
                });
            })
            .catch(error => { console.log("Error in TeacherList fetchData") });
        this.setState({ teachers: teachers });
    }

    async fetchDataDesc(orderBy = "") {
        let teachers = [];
        await Axios.get(`http://localhost:4000/teachers/${orderBy}/desc`)
            .then(response => {
                response.data.forEach(teacher => {
                    teachers.push(<TeacherComponent teacher={teacher} />);
                });
            })
            .catch(error => { console.log("Error in TeacherList fetchDataDesc") });
        this.setState({ teachers: teachers });
    }

    async componentDidMount() {
        await this.fetchData();
    };

    async changeOrderTeacher(orderBy, e) {
        e.preventDefault();
        this.setState({ teachers: [] });
        await this.fetchData(orderBy);
    }

    async changeOrderTeacherDesc(orderBy, e) {
        e.preventDefault();
        this.setState({ teachers: [] });
        await this.fetchDataDesc(orderBy);
    }

    render() {
        return (
            <main>
                <div>
                    <h1>Tanárok</h1>

                    <div>
                        <h2>Lista rendezése</h2>
                        <h3>Növekvő sorrend</h3>
                        <button onClick={(e) => this.changeOrderTeacher("pedagogus_id", e)}>Azonosító</button>
                        <button onClick={(e) => this.changeOrderTeacher("nev", e)}>Név</button>
                        <h3>Csökkenő sorrend</h3>
                        <button onClick={(e) => this.changeOrderTeacherDesc("pedagogus_id", e)}>Azonosító</button>
                        <button onClick={(e) => this.changeOrderTeacherDesc("nev", e)}>Név</button>
                    </div>

                    <h2>Tanárok listája</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Azonosító</th>
                                <th>Név</th>
                                <th>Tanított tárgyak</th>
                            </tr>
                            {this.state.teachers}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}