import React, { Component } from 'react';
import Axios from 'axios';
import ClassroomComponent from './ClassroomComponent';
import './classrooms.css'

export default class ClassroomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classrooms: []
        }
    }

    async fetchData(orderby="") {
        let classrooms = [];
        await Axios.get(`http://localhost:4000/classrooms/${orderby}`)
             .then(response => {
                 response.data.forEach(classroom => {
                    classrooms.push(<ClassroomComponent classroom = {classroom}/>);
                 });
             })
             .catch(error => { console.log("Error in ClassroomList fetchData") });
        this.setState({ classrooms: classrooms });
    }

    async fetchDataDesc(orderby="") {
        let classrooms = [];
        await Axios.get(`http://localhost:4000/classrooms/${orderby}/desc`)
             .then(response => {
                 response.data.forEach(classroom => {
                    classrooms.push(<ClassroomComponent classroom = {classroom}/>);
                 });
             })
             .catch(error => { console.log("Error in ClassroomList fetchDataDesc") });
        this.setState({ classrooms: classrooms });
    }
    
    async componentDidMount() {
        await this.fetchData();
    };
    
    async changeOrderClassroom(orderby, e) {
        e.preventDefault();
        this.setState({classrooms: []});
        await this.fetchData(orderby);
    }

    async changeOrderClassroomDesc(orderby, e) {
        e.preventDefault();
        this.setState({classrooms: []});
        await this.fetchDataDesc(orderby);
    }
    
    render() {
        return (
            <main id="classroomspage">
                <div>
                    <h1>Tantermek</h1>
                    <div id="orderbuttons">
                        <h2>Lista rendezése</h2>
                        <h3>Növekvő sorrend</h3>
                        <button onClick={(e) => this.changeOrderClassroom("teremszam", e)}>Teremszám</button>
                        <button onClick={(e) => this.changeOrderClassroom("kapacitas", e)}>Kapacitás</button>
                        <button onClick={(e) => this.changeOrderClassroom("gepterem_e", e)}>Gépterem</button>
                        <h3>Csökkenő sorrend</h3>
                        <button onClick={(e) => this.changeOrderClassroomDesc("teremszam", e)}>Teremszám</button>
                        <button onClick={(e) => this.changeOrderClassroomDesc("kapacitas", e)}>Kapacitás</button>
                        <button onClick={(e) => this.changeOrderClassroomDesc("gepterem_e", e)}>Gépterem</button>                        
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