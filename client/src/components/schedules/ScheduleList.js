import React, { Component } from 'react';
import Axios from 'axios';
import ScheduleComponent from './ScheduleComponent';
import './schedules.css'

const DaysEnum = Object.freeze({"Hétfő": 0, "Kedd": 1, "Szerda": 2, "Csütörtök": 3, "Péntek": 4});

export default class ScheduleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: [],
            classes: []
        }
    }

    async fetchDataClasses() {
        let temp = [];
        await Axios.get(`http://localhost:4000/classlist`)
            .then(response => {    
                response.data.forEach(classid => {
                    temp.push(<option value = {classid.osztaly_id}> {classid.osztaly_id} &nbsp; - &nbsp; Osztályfőnök: {classid.tanar}</option>);
                });
             })
             .catch(error => { console.log("Error in ScheduleList fetchDataClasses") });
        this.setState({ classes: temp });
    }

    async fetchData(classId = "") {
        let temp = [];
        let schedules =  new Array(9);
        for (let i=0; i<9; i++) {
            schedules[i] = new Array(6);
            schedules[i].fill("");
            schedules[i][0] = i;
        }

        await Axios.get(`http://localhost:4000/schedule/${classId}`)
            .then(response => {    
                for (let i=0; i<response.data.length; i++) {
                    schedules[response.data[i].ora][DaysEnum[response.data[i].nap]+1] = response.data[i];
                }

                for (let i=0; i<9; i++) {
                    temp.push(<ScheduleComponent lessons = {schedules[i]} />);
                }
             })
             .catch(error => { console.log("Error in ScheduleList fetchData") });
        this.setState({ schedules: temp });
    }

    async changeSchedule(classId = "", e) {
        e.preventDefault();
        this.setState({schedules: []});
        await this.fetchData(classId);
    }

    async componentDidMount() {
        await this.fetchDataClasses();
    }

    render() {
        return (
            <main>
                <div id="schedule">
                    <h1>Órarendek</h1>
                    <h2>Osztály</h2>
                    <select onChange={(e) => this.changeSchedule(e.target.value, e)}>
                        {this.state.classes}
                    </select>

                    <table>
                        <tbody>
                            <tr>
                                <th>Óra</th>
                                <th>Hétfő</th>
                                <th>Kedd</th>
                                <th>Szerda</th>
                                <th>Csütörtök</th>
                                <th>Péntek</th>
                            </tr>
                            {this.state.schedules}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}