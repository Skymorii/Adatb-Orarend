import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { accordion } from './AdminComponent';
import './admin.css'

export default class ModifySubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            add_nev: "",
            modify_nev: "",
            modify_nev_new: "",
            delete_subject: ""
        }
    }

    // Get
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

    // Post add
    add_enterSubjectName(event) {
        event.preventDefault();
        this.setState({ add_nev: event.target.value });
    }

    async add_subject(event) {
        event.preventDefault();
        let subjectRegex = /^[a-záéúőóüöíA-ZÁÉÚŐÓÜÖÍ]*$/;

        if (this.state.add_nev.length > 255 || this.state.add_nev.length <= 0 || !subjectRegex.test(this.state.add_nev)) {
            alert("Nem megfelelő a tantárgy neve!");
        } else {
            Axios.post("http://localhost:4000/add/subject", {
                nev: this.state.add_nev
            })
                .then(async resp => {
                    console.log("Subject added successfully");
                    alert("Tantárgy hozzáadása sikeres!");
                    this.setState({ add_nev: "" });
                    await this.fetchDataSubjects();
                })
                .catch(err => {
                    console.log("Error in ModifySubjects add_subject");
                    alert("Hiba történt");
                });
        }
    }

    // Post modify
    modify_chosenSubject(event) {
        event.preventDefault();
        this.setState({ modify_nev: event.target.value });
    }

    modify_enterSubjectName(event) {
        event.preventDefault();
        this.setState({ modify_nev_new: event.target.value });
    }

    async modify_subject(event) {
        event.preventDefault();
        let subjectRegex = /^[a-záéúőóüöíA-ZÁÉÚŐÓÜÖÍ]*$/;

        if (this.state.modify_nev_new.length > 255 || this.state.modify_nev_new.length <= 0 || !subjectRegex.test(this.state.modify_nev_new)) {
            alert("Nem megfelelő a tantárgy neve!");
        } else {
            Axios.post("http://localhost:4000/modify/subject", {
                new_nev: this.state.modify_nev_new,
                old_nev: this.state.modify_nev
            })
                .then(async resp => {
                    console.log("Subject modified successfully");
                    alert("Tantárgy módosítása sikeres!");
                    this.setState({ modify_nev_new: "" });
                    this.setState({ modify_nev: "" });
                    await this.fetchDataSubjects();
                })
                .catch(err => {
                    console.log("Error in ModifySubjects modify_subject");
                    alert("Hiba történt");
                });
        }
    }

    // Post delete
    delete_chosenSubject(event) {
        event.preventDefault();
        this.setState({ delete_subject: event.target.value });
    }

    async delete_subject(event) {
        event.preventDefault();

        Axios.post("http://localhost:4000/delete/subject", {
            nev: this.state.delete_subject
        })
            .then(async resp => {
                console.log("Subject deleted successfully");
                alert("Tantárgy törlése sikeres!");
                this.setState({ delete_subject: "" });
                await this.fetchDataSubjects();
            })
            .catch(err => {
                console.log("Error in ModifySubjects delete_subject");
                alert("Hiba történt");
            });
    }

    render() {
        return (
            <main className="admin">
                <h1>Tantárgyak módosítása</h1>

                <button className="accordion" id="addsubject" onClick={(e) => accordion(e.target.id)}>Tantárgy hozzáadása</button>
                <div className="panel">
                    <form onSubmit={this.add_subject.bind(this)}>
                        Tanárgy neve:
                        <input type="text" value={this.state.add_nev} placeholder="Tantárgy neve" maxLength="255" required onChange={this.add_enterSubjectName.bind(this)} />
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifysubject" onClick={(e) => accordion(e.target.id)}>Tantárgy módosítása</button>
                <div className="panel">
                    <form onSubmit={this.modify_subject.bind(this)}>
                        Módosítandó tantárgy kiválasztása:
                        <select value={this.state.modify_nev} onChange={this.modify_chosenSubject.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.subjects}
                        </select>
                        Tanárgy neve:
                        <input type="text" value={this.state.modify_nev_new} name="nev" placeholder="Tantárgy neve" maxLength="255" required onChange={this.modify_enterSubjectName.bind(this)}/>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deletesubject" onClick={(e) => accordion(e.target.id)}>Tantárgy törlése</button>
                <div className="panel">
                    <form onSubmit={this.delete_subject.bind(this)}>
                        Törlendő tantárgy kiválasztása:
                        <select value={this.state.delete_subject} onChange={this.delete_chosenSubject.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.subjects}
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