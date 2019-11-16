import React, { Component } from 'react';
import Axios from 'axios';
import { accordion } from './AdminComponent';
import './admin.css'

export default class ModifySubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        }
    }

    async fetchDataSubjects() {
        let temp = [];
        await Axios.get(`http://localhost:4000/subjects`)
            .then(response => {
                response.data.forEach(subject => {
                    temp.push(<option value={subject.nev}>{subject.nev}</option>);
                });
            })
            .catch(error => { console.log("Error in ModifySubjects fetchDataSubjects") });
        this.setState({ subjects: temp });
    }

    async componentDidMount() {
        await this.fetchDataSubjects();
    }

    render() {
        return (
            <main className="admin">
                <h1>Tantárgyak módosítása</h1>

                <button className="accordion" id="addsubject" onClick={(e) => accordion(e.target.id)}>Tantárgy hozzáadása</button>
                <div className="panel">
                    <form name="addsubject">
                        Tanárgy neve:
                        <input type="text" name="nev" placeholder="Tantárgy neve" maxLength="255" required />
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifysubject" onClick={(e) => accordion(e.target.id)}>Tantárgy módosítása</button>
                <div className="panel">
                    <form name="modifysubject">
                        Módosítandó tantárgy kiválasztása:
                        <select name="nev_tomodify">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        Tanárgy neve:
                        <input type="text" name="nev" placeholder="Tantárgy neve" maxLength="255" required />
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deletesubject" onClick={(e) => accordion(e.target.id)}>Tantárgy törlése</button>
                <div className="panel">
                    <form name="deletesubject">
                        Törlendő tantárgy kiválasztása:
                        <select name="nev_todelete">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>
            </main>
        );
    }

}