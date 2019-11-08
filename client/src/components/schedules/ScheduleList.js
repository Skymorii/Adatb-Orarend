import React, { Component } from 'react';
import Axios from 'axios';
import ScheduleComponent from './ScheduleComponent';
import './schedules.css'

const DaysEnum = Object.freeze({"Hétfő":0, "Kedd":1, "Szerda":2, "Csütörtök":3, "Péntek":4});

export default class ScheduleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: []
        }
    }

    async fetchData() {
        let temp = [];
        let schedules =  new Array(9);
        for (let i=0; i<9; i++) {
            schedules[i] = new Array(6);
            schedules[i].fill("");
            schedules[i][0] = i;
        }

        await Axios.get(`http://localhost:4000/schedule`)
            .then(response => {    
                for (let i=0; i<response.data.length; i++) {
                    schedules[response.data[i].ora][DaysEnum[response.data[i].nap]+1] = response.data[i].nev;
                }

                for (let i=0; i<9; i++) {
                    temp.push(<ScheduleComponent lessons={schedules[i]} />);
                }
             })
             .catch(error => { console.log("Error in ScheduleList fetchData") });
        this.setState({ schedules: temp });
    }

    async componentDidMount() {
        await this.fetchData()
    }

    
    render() {
        return (
            <main id="schedulespage">
                <div>
                    <h1>Órarendek</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
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
        )
    }
}