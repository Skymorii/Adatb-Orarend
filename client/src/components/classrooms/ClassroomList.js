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
        await Axios.get(`http://localhost:4000/classrooms`)
             .then(response => {
                 response.data.forEach(classroom => {
                    classrooms.push(<ClassroomComponent classroom = {classroom}/>);
                 });
             })
             .catch(error => { console.log("Error in ClassroomList componentDidMount") });
        this.setState({ classrooms: classrooms });
    };
    
    async changeOrderClassroom(orderby, e) {
        e.preventDefault();
        let classrooms = [];
        await Axios.get(`http://localhost:4000/classrooms/${orderby}`)
        .then(response => {
            response.data.forEach(classroom => {
                classrooms.push(<ClassroomComponent classroom = {classroom}/>);
            });
        })
        .catch(error => { console.log("Error in ClassroomList changeOrderClassroom") });
        this.setState({ classrooms: classrooms });
    }
    
    render() {
        return (
            <main id="classroomspage">
                <div>
                    <h1>Tantermek</h1>
                    <div id="orderbuttons">
                        <h2>Lista rendezése</h2>
                        <button onClick={(e) => this.changeOrderClassroom("teremszam", e)}>Teremszám</button>
                        <button onClick={(e) => this.changeOrderClassroom("kapacitas", e)}>Kapacitás</button>
                        <button onClick={(e) => this.changeOrderClassroom("gepterem_e", e)}>Gépterem</button>
                    </div>
                    <h2>Tantermek listája</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Teremszám</th>
                                <th>Kapacitás</th>
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