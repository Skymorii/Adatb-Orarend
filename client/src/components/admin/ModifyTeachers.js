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
            subjects: [],

            add_pedagogus_id: "",
            add_nev: "",
            add_tantargy1: "",
            add_tantargy2: "",

            modify_pedagogus_id: "",
            modify_targynev1: "",
            modify_targynev2: "",
            modify_pedagogus_id_new: "",
            modify_nev_new: "",
            modify_tantargy1_new: "",
            modify_tantargy2_new: "",

            delete_teacher: ""
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

    // Post add
    add_enterTeacherId(event) {
        event.preventDefault();
        this.setState({ add_pedagogus_id: event.target.value });
    }

    add_enterTeacherName(event) {
        event.preventDefault();
        this.setState({ add_nev: event.target.value });
    }

    add_enterTeacherSubject1(event) {
        event.preventDefault();
        this.setState({ add_tantargy1: event.target.value });
    }

    add_enterTeacherSubject2(event) {
        event.preventDefault();
        this.setState({ add_tantargy2: event.target.value });
    }

    async add_teacher(event) {
        event.preventDefault();
        let teacherIDRegex = /^[A-Z0-9]{8}$/;
        let teacherNameRegex = /^[a-záéúőóüöíA-ZÁÉÚŐÓÜÖÍ ]{1,255}$/;

        if (!teacherIDRegex.test(this.state.add_pedagogus_id) || !teacherNameRegex.test(this.state.add_nev)) {
            alert("Nem megfelelő adatok!");
        } else {
            Axios.post("http://localhost:4000/add/teacher", {
                pedagogus_id: this.state.add_pedagogus_id,
                nev: this.state.add_nev,
                targynev1: this.state.add_tantargy1,
                targynev2: this.state.add_tantargy2
            })
                .then(async resp => {
                    console.log("Teacher added successfully");
                    alert("Tanár hozzáadása sikeres!");
                    this.setState({
                        add_pedagogus_id: "",
                        add_nev: "",
                        add_tantargy1: "",
                        add_tantargy2: ""
                    });
                    await this.fetchDataTeachers();
                })
                .catch(err => {
                    console.log("Error in ModifyTeachers add_teacher");
                    alert("Hiba történt");
                });
        }
    }

    // Post modify
    modify_chosenTeacher(event) {
        event.preventDefault();
        this.setState({ modify_pedagogus_id: event.target.value });
    }

    modify_enterTeacherId(event) {
        event.preventDefault();
        this.setState({ modify_pedagogus_id_new: event.target.value });
    }

    modify_enterTeacherName(event) {
        event.preventDefault();
        this.setState({ modify_nev_new: event.target.value });
    }

    modify_enterTeacherSubject1(event) {
        event.preventDefault();
        this.setState({ modify_tantargy1_new: event.target.value });
    }

    modify_enterTeacherSubject2(event) {
        event.preventDefault();
        this.setState({ modify_tantargy2_new: event.target.value });
    }

    async modify_teacher(event) {
        event.preventDefault();
        let teacherIDRegex = /^[A-Z0-9]{8}$/;
        let teacherNameRegex = /^[a-záéúőóüöíA-ZÁÉÚŐÓÜÖÍ ]{1,255}$/;

        if (!teacherIDRegex.test(this.state.modify_pedagogus_id_new) || !teacherNameRegex.test(this.state.modify_nev_new)) {
            alert("Nem megfelelő adatok!");
        } else {
            Axios.post("http://localhost:4000/modify/teacher", {
                old_pedagogus_id: this.state.modify_pedagogus_id,
                new_pedagogus_id: this.state.modify_pedagogus_id_new,
                new_nev: this.state.modify_nev_new,
                new_tantargy1: this.state.modify_tantargy1_new,
                new_tantargy2: this.state.modify_tantargy2_new
            })
                .then(async resp => {
                    console.log("Teacher modified successfully");
                    alert("Tanár módosítása sikeres!");
                    this.setState({
                        modify_pedagogus_id: "",
                        modify_pedagogus_id_new: "",
                        modify_tantargy1_new: "",
                        modify_tantargy2_new: "",
                    });
                    await this.fetchDataTeachers();
                })
                .catch(err => {
                    console.log("Error in ModifyTeachers modify_teacher");
                    alert("Hiba történt");
                });
        }
    }

    // Post delete
    delete_chosenTeacher(event) {
        event.preventDefault();
        this.setState({ delete_teacher: event.target.value });
    }

    async delete_teacher(event) {
        event.preventDefault();

        Axios.post("http://localhost:4000/delete/teacher", {
            pedagogus_id: this.state.delete_teacher
        })
            .then(async resp => {
                console.log("Teacher deleted successfully");
                alert("Tanár törlése sikeres!");
                this.setState({ delete_teacher: "" });
                await this.fetchDataTeachers();
            })
            .catch(err => {
                console.log("Error in ModifyTeachers delete_teacher");
                alert("Hiba történt");
            });
    }

    render() {
        return (
            <main className="admin">
                <h1>Tanárok módosítása</h1>

                <button className="accordion" id="addteacher" onClick={(e) => accordion(e.target.id)}>Tanár hozzáadása</button>
                <div className="panel">
                    <form onSubmit={this.add_teacher.bind(this)}>
                        Pedagógus ID:<br />
                        <input type="text" value={this.state.add_pedagogus_id} onChange={this.add_enterTeacherId.bind(this)} placeholder="Pedagógus ID" maxLength="8" required /> <br />
                        Teljes név:<br />
                        <input type="text" value={this.state.add_nev} onChange={this.add_enterTeacherName.bind(this)} placeholder="Teljes név" min="1" max="255" required /> <br />
                        Tanított tárgyak:<br />
                        <select value={this.state.add_tantargy1} onChange={this.add_enterTeacherSubject1.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <select value={this.state.add_tantargy2} onChange={this.add_enterTeacherSubject2.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifyteacher" onClick={(e) => accordion(e.target.id)}>Tanár módosítása</button>
                <div className="panel">
                    <form onSubmit={this.modify_teacher.bind(this)}>
                        Módosítandó tanár kiválasztása:
                        <select value={this.state.modify_pedagogus_id} onChange={this.modify_chosenTeacher.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Pedagógus ID:<br />
                        <input type="text" value={this.state.modify_pedagogus_id_new} onChange={this.modify_enterTeacherId.bind(this)} placeholder="Pedagógus ID" maxLength="8" required /> <br />
                        Teljes név:<br />
                        <input type="text" value={this.state.modify_nev_new} onChange={this.modify_enterTeacherName.bind(this)} placeholder="Teljes név" min="1" max="255" required /> <br />
                        Tanított tárgyak:<br />
                        <select value={this.state.modify_tantargy1_new} onChange={this.modify_enterTeacherSubject1.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <select value={this.state.modify_tantargy2_new} onChange={this.modify_enterTeacherSubject2.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deleteteacher" onClick={(e) => accordion(e.target.id)}>Tanár törlése</button>
                <div className="panel">
                    <form onSubmit={this.delete_teacher.bind(this)}>
                        Törlendő tanár kiválasztása:
                        <select value={this.state.delete_teacher} onChange={this.delete_chosenTeacher.bind(this)}>
                            <option value="" selected disabled></option>
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