import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { accordion } from './AdminComponent';
import './admin.css'

export default class ModifyLessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            classes: [],
            teachers: [],
            subjects: [],
            classrooms: []
        }
    }

    async fetchDataLessons() {
        let temp = [];
        await Axios.get(`http://localhost:4000/lessons`)
            .then(response => {
                response.data.forEach(lesson => {
                    temp.push(<option value={lesson.teremszam + lesson.nap + lesson.ora}>Nap: {lesson.nap} - Óra: {lesson.ora} - Terem: {lesson.teremszam}</option>);
                });
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataClasses") });
        console.log(temp);
        this.setState({ lessons: temp });
    }

    async fetchDataClasses() {
        let temp = [];
        await Axios.get(`http://localhost:4000/classes`)
            .then(response => {
                response.data.forEach(classid => {
                    temp.push(<option value={classid.osztaly_id}>ID: {classid.osztaly_id} - Osztályfőnök: {classid.nev}</option>);
                });
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataClasses") });
        console.log(temp);
        this.setState({ classes: temp });
    }

    async fetchDataTeachers() {
        let temp = [];
        await Axios.get(`http://localhost:4000/teachers`)
            .then(response => {
                response.data.forEach(teacher => {
                    temp.push(<option value={teacher.pedagogus_id}>ID: {teacher.pedagogus_id} - Név: {teacher.nev} - Tárgyak: {teacher.targyak}</option>);
                });
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataTeachers") });
        console.log(temp);
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
            .catch(error => { console.log("Error in AdminComponent fetchDataSubjects") });
        console.log(temp);
        this.setState({ subjects: temp });
    }

    async fetchDataClassrooms() {
        let temp = [];
        await Axios.get(`http://localhost:4000/classrooms`)
            .then(response => {
                response.data.forEach(room => {
                    temp.push(<option value={room.teremszam}>Teremszám: {room.teremszam} - Kapacitás: {room.kapacitas} - Gépterem: {room.gepterem_e ? "✅" : "❌"}</option>);
                });
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataClassrooms") });
        console.log(temp);
        this.setState({ classrooms: temp });
    }

    async componentDidMount() {
        await this.fetchDataLessons();
        await this.fetchDataClasses();
        await this.fetchDataClassrooms();
        await this.fetchDataSubjects();
        await this.fetchDataTeachers();
    }

    render() {
        return (
            <main className="admin">
                <h1>Órarend módosítása</h1>

                <button className="accordion" id="addlesson" onClick={(e) => accordion(e.target.id)}>Óra hozzáadása</button>
                <div className="panel">
                    <form name="addlesson">
                        Terem:
                        <select name="teremszam">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        Nap:
                        <select name="nap">
                            <option selected disabled></option>
                            <option value="Hétfő">Hétfő</option>
                            <option value="Kedd">Kedd</option>
                            <option value="Szerda">Szerda</option>
                            <option value="Csütörtök">Csütörtök</option>
                            <option value="Péntek">Péntek</option>
                        </select>
                        Óra:
                        <input type="number" name="ora" placeholder="Óra" min="0" max="8" required /> <br />
                        Osztály:
                        <select name="osztaly_id">
                            <option selected disabled></option>
                            {this.state.classes}
                        </select>
                        Tanár:
                        <select name="pedagogus_id">
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Tantárgy:
                        <select name="nev">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>

                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifylesson" onClick={(e) => accordion(e.target.id)}>Óra módosítása</button>
                <div className="panel">
                    <form name="modifylesson">
                        Módosítandó tantárgy kiválasztása:
                        <select name="tanora_tomodify">
                            <option selected disabled></option>
                            {this.state.lessons}
                        </select>
                        Terem:
                        <select name="teremszam">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        Nap:
                        <select name="nap">
                            <option selected disabled></option>
                            <option value="Hétfő">Hétfő</option>
                            <option value="Kedd">Kedd</option>
                            <option value="Szerda">Szerda</option>
                            <option value="Csütörtök">Csütörtök</option>
                            <option value="Péntek">Péntek</option>
                        </select>
                        Óra:
                        <input type="number" name="ora" placeholder="Óra" min="0" max="8" required /> <br />
                        Osztály:
                        <select name="osztaly_id">
                            <option selected disabled></option>
                            {this.state.classes}
                        </select>
                        Tanár:
                        <select name="pedagogus_id">
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Tantárgy:
                        <select name="nev">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deletelesson" onClick={(e) => accordion(e.target.id)}>Óra törlése</button>
                <div className="panel">
                    <form name="deletelesson">
                        Törlendő tantárgy kiválasztása:
                        <select name="tanora_todelete">
                            <option selected disabled></option>
                            {this.state.lessons}
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