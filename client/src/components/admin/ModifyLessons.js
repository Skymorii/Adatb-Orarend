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
            classrooms: [],

            add_teremszam: "",
            add_nap: "",
            add_ora: "",
            add_osztaly: "",
            add_tanar: "",
            add_tantargy: "",

            delete_teremszam: "",
            delete_nap: "",
            delete_ora: "",
        }
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
        await this.fetchDataClasses();
        await this.fetchDataClassrooms();
        await this.fetchDataSubjects();
        await this.fetchDataTeachers();
    }

    // Post add
    add_enterLessonRoom(event) {
        event.preventDefault();
        this.setState({ add_teremszam: event.target.value });
    }

    add_enterLessonDay(event) {
        event.preventDefault();
        this.setState({ add_nap: event.target.value });
    }

    add_enterLessonNumber(event) {
        event.preventDefault();
        this.setState({ add_ora: event.target.value });
    }

    add_enterLessonClass(event) {
        event.preventDefault();
        this.setState({ add_osztaly: event.target.value });
    }

    add_enterLessonTeacher(event) {
        event.preventDefault();
        this.setState({ add_tanar: event.target.value });
    }

    add_enterLessonSubject(event) {
        event.preventDefault();
        this.setState({ add_tantargy: event.target.value });
    }

    async add_lesson(event) {
        event.preventDefault();

        if (this.state.add_ora < 0 || this.state.add_ora > 9) {
            alert("Nem megfelelő adatok!");
        } else {
            Axios.post("http://localhost:4000/add/lesson", {
                teremszam: this.state.add_teremszam,
                nap: this.state.add_nap,
                ora: this.state.add_ora,
                osztaly_id: this.state.add_osztaly,
                pedagogus_id: this.state.add_tanar,
                nev: this.state.add_tantargy
            })
                .then(async resp => {
                    console.log("Lesson added successfully");
                    alert("Óra hozzáadása sikeres!");
                    this.setState({
                        add_teremszam: "",
                        add_nap: "",
                        add_ora: "",
                        add_osztaly: "",
                        add_tanar: "",
                        add_tantargy: ""
                    });
                })
                .catch(err => {
                    console.log("Error in ModifyLessons add_lesson");
                    alert("Hiba történt");
                });
        }
    }

    // Post delete
    delete_enterLessonRoom(event) {
        event.preventDefault();
        this.setState({ delete_teremszam: event.target.value });
    }

    delete_enterLessonDay(event) {
        event.preventDefault();
        this.setState({ delete_nap: event.target.value });
    }

    delete_enterLessonNumber(event) {
        event.preventDefault();
        this.setState({ delete_ora: event.target.value });
    }

    async delete_lesson(event) {
        event.preventDefault();

        Axios.post("http://localhost:4000/delete/lesson", {
            teremszam: this.state.delete_teremszam,
            nap: this.state.delete_nap,
            ora: this.state.delete_ora
        })
            .then(async resp => {
                console.log("Lesson deleted successfully");
                alert("Óra törlése sikeres!");
                this.setState({
                    delete_teremszam: "",
                    delete_nap: "",
                    delete_ora: ""
                });
            })
            .catch(err => {
                console.log("Error in ModifyLessons delete_lesson");
                alert("Hiba történt");
            });
    }

    render() {
        return (
            <main className="admin">
                <h1>Órarend módosítása</h1>

                <button className="accordion" id="addlesson" onClick={(e) => accordion(e.target.id)}>Óra hozzáadása</button>
                <div className="panel">
                    <form onSubmit={this.add_lesson.bind(this)}>
                        Terem:
                        <select value={this.state.add_teremszam} onChange={this.add_enterLessonRoom.bind(this)}>
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        Nap:
                        <select value={this.state.add_nap} onChange={this.add_enterLessonDay.bind(this)}>
                            <option selected disabled></option>
                            <option value="Hétfő">Hétfő</option>
                            <option value="Kedd">Kedd</option>
                            <option value="Szerda">Szerda</option>
                            <option value="Csütörtök">Csütörtök</option>
                            <option value="Péntek">Péntek</option>
                        </select>
                        Óra:
                        <input type="number" name="ora" placeholder="Óra" min="0" max="8" required value={this.state.add_ora} onChange={this.add_enterLessonNumber.bind(this)}/> <br />
                        Osztály:
                        <select value={this.state.add_osztaly} onChange={this.add_enterLessonClass.bind(this)}>
                            <option selected disabled></option>
                            {this.state.classes}
                        </select>
                        Tanár:
                        <select value={this.state.add_tanar} onChange={this.add_enterLessonTeacher.bind(this)}>
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Tantárgy:
                        <select value={this.state.add_tantargy} onChange={this.add_enterLessonSubject.bind(this)}>
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>

                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>

                <button className="accordion" id="deletelesson" onClick={(e) => accordion(e.target.id)}>Óra törlése</button>
                <div className="panel">
                    <form onSubmit={this.delete_lesson.bind(this)}>
                        Terem:
                        <select value={this.state.delete_teremszam} onChange={this.delete_enterLessonRoom.bind(this)}>
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        Nap:
                        <select value={this.state.delete_nap} onChange={this.delete_enterLessonDay.bind(this)}>
                            <option selected disabled></option>
                            <option value="Hétfő">Hétfő</option>
                            <option value="Kedd">Kedd</option>
                            <option value="Szerda">Szerda</option>
                            <option value="Csütörtök">Csütörtök</option>
                            <option value="Péntek">Péntek</option>
                        </select>
                        Óra:
                        <input type="number" name="ora" placeholder="Óra" min="0" max="8" required value={this.state.delete_ora} onChange={this.delete_enterLessonNumber.bind(this)}/> <br />

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