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

    async componentDidMount() {
        let lessonsrow = ["", "", "", "", ""];
        let schedules = [];
        
        await Axios.get(`http://localhost:4000/schedule`)
            .then(response => {    
                for (let i=0; i<9; i++) {
                    lessonsrow = ["", "", "", "", ""];
                    for (let j=0; j<5; j++) {
                        for (let k=0; k<response.data.length; k++) {
                            if (response.data[k].ora === i && DaysEnum[response.data[k].nap] === j) {
                                lessonsrow[j] = response.data[k].nev;
                            }
                        }
                    }
                    console.log(lessonsrow);
                    schedules.push(<ScheduleComponent lessons={lessonsrow} />);
                }            
             })
             .catch(error => { console.log("Error in ScheduleList fetchData") });
        this.setState({ schedules: schedules });
    }

    
    render() {
        return (
            <main id="schedulespage">
                <div>
                    <h1>Órarendek</h1>
                    <table>
                        <tbody>
                            <tr>
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