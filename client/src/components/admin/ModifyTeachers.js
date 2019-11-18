import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { accordion } from './AdminComponent';
import './admin.css'

export default class ModifyTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            subjects: []
        }
    }

    async fetchDataTeachers() {
        let temp = [];
        await Axios.get(`http://localhost:4000/teachers`)
            .then(response => {
                response.data.forEach(teacher => {
                    temp.push(<option value={teacher.pedagogus_id}>ID: {teacher.pedagogus_id} - Név: {teacher.nev} - Tárgyak: {teacher.targyak}</option>);
                });
            })
            .catch(error => { console.log("Error in ModifyTeacher fetchDataTeachers") });
        this.setState({ teachers: temp });
    }

    async fetchDataSubjects() {
        let temp = [];
        await Axios.get(`http://localhost:4000/subjects`)
            .then(response => {
                response.data.forEach(subject => {
                    temp.push(<option value={subject.nev}>{subject.nev}</option>);
                });
            })
            .catch(error => { console.log("Error in ModifyTeacher fetchDataSubjects") });
        this.setState({ subjects: temp });
    }

    async componentDidMount() {
        await this.fetchDataTeachers();
        await this.fetchDataSubjects();
    }

    render() {
        return (
            <main className="admin">
                <h1>Tanárok módosítása</h1>

                <button className="accordion" id="addteacher" onClick={(e) => accordion(e.target.id)}>Tanár hozzáadása</button>
                <div className="panel">
                    <form name="addteacher">
                        Pedagógus ID:<br />
                        <input type="text" name="pedagogus_id" placeholder="Pedagógus ID" maxLength="8" required /> <br />
                        Teljes név:<br />
                        <input type="text" name="nev" placeholder="Teljes név" min="1" max="255" required /> <br />
                        Tanított tárgyak:<br />
                        <select name="targy_1">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <select name="targy_2">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifyteacher" onClick={(e) => accordion(e.target.id)}>Tanár módosítása</button>
                <div className="panel">
                    <form name="modifyteacher">
                        Módosítandó tanár kiválasztása:
                        <select name="pedagogus_id_tomodify">
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Pedagógus ID:<br />
                        <input type="text" name="pedagogus_id" placeholder="Pedagógus ID" maxLength="8" required /> <br />
                        Teljes név:<br />
                        <input type="text" name="nev" placeholder="Teljes név" min="1" max="255" required /> <br />
                        Tanított tárgyak:<br />
                        <select name="targy_1">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <select name="targy_2">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deleteteacher" onClick={(e) => accordion(e.target.id)}>Tanár törlése</button>
                <div className="panel">
                    <form name="deleteteacher">
                        Törlendő tanár kiválasztása:
                        <select name="pedagogus_id_todelete">
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>
                

                <Link to="/admin">
                    <button className="toadmin">Vissza az admin felületre</button>
                </Link>
            </main>
        );
    }

}