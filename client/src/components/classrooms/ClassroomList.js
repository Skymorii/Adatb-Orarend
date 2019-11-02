import React, { Component } from 'react';
import Axios from 'axios';
import ClassroomComponent from './ClassroomsComponent';
import './classrooms.css'


export default class ClassroomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classrooms: []
        }
    }

    async componentDidMount() {
        let classrooms = [];
        await Axios.get("http://localhost:4000/classrooms")
             .then(response => {
                 response.data.forEach(classroom => {
                    classrooms.push(<ClassroomComponent classroom = {classroom}/>);
                 });
             })
             .catch(error => { console.log("ClassroomList componentDidMount error") });
        this.setState({ classrooms: classrooms });
    }

    render() {
        return (
            <main id="classroomspage">
                <div>
                    <h1>Tantermek</h1>
                    <h2>Összes tanterem listája</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Teremszám</th>
                                <th>kapacitas</th>
                                <th>Gépterem</th>
                            </tr>
                            {this.state.classrooms}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}