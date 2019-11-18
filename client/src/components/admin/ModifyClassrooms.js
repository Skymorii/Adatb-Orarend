import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { accordion } from './AdminComponent';
import './admin.css'

export default class ModifyClassrooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classrooms: [],

            add_teremszam: "",
            add_kapacitas: "",
            add_gepterem_e: "",

            modify_teremszam: "",
            modify_teremszam_new: "",
            modify_kapacitas_new: "",
            modify_gepterem_e_new: "",

            delete_classroom: ""
        }
    }

    async fetchDataClassrooms() {
        let temp = [];
        await Axios.get(`http://localhost:4000/classrooms`)
            .then(response => {
                response.data.forEach(room => {
                    temp.push(<option value={room.teremszam}>Teremszám: {room.teremszam} - Kapacitás: {room.kapacitas} - Gépterem: {room.gepterem_e ? "✅" : "❌"}</option>);
                });
            })
            .catch(error => { console.log("Error in ModifyClassrooms fetchDataClassrooms") });
        this.setState({ classrooms: temp });
    }

    async componentDidMount() {
        await this.fetchDataClassrooms();
    }

    // Post add
    add_enterClassroomNumber(event) {
        event.preventDefault();
        this.setState({ add_teremszam: event.target.value });
    }

    add_enterClassroomCapacity(event) {
        event.preventDefault();
        this.setState({ add_kapacitas: event.target.value });
    }

    add_enterClassroomComputer(event) {
        event.preventDefault();
        this.setState({ add_gepterem_e: event.target.value });
    }

    async add_classroom(event) {
        event.preventDefault();
        let classroomNameRegex = /^[a-záéúőóüöíA-ZÁÉÚŐÓÜÖÍ0-9]*$/;
        let classroomCapacityRegex = /^[0-9]*$/;

        if (this.state.add_teremszam.length > 4 || this.state.add_teremszam.length <= 0 || !classroomNameRegex.test(this.state.add_teremszam)
            || this.state.add_kapacitas > 999 || this.state.add_kapacitas <= 0 || !classroomCapacityRegex.test(this.state.add_kapacitas)
            || this.state.add_gepterem_e > 1 || this.state.add_gepterem_e < 0) {
            alert("Nem megfelelő adatok!");
        } else {
            Axios.post("http://localhost:4000/add/classroom", {
                teremszam: this.state.add_teremszam,
                kapacitas: this.state.add_kapacitas,
                gepterem_e: this.state.add_gepterem_e
            })
                .then(async resp => {
                    console.log("Classroom added successfully");
                    alert("Tanterem hozzáadása sikeres!");
                    this.setState({
                        add_teremszam: "",
                        add_kapacitas: "",
                        add_gepterem_e: ""
                    });
                    await this.fetchDataClassrooms();
                })
                .catch(err => {
                    console.log("Error in ModifyClassrooms add_classroom");
                    alert("Hiba történt");
                });
        }
    }

    // Post modify
    modify_chosenClassroom(event) {
        event.preventDefault();
        this.setState({ modify_teremszam: event.target.value });
    }

    modify_enterClassroomNumber(event) {
        event.preventDefault();
        this.setState({ modify_teremszam_new: event.target.value });
    }

    modify_enterClassroomCapacity(event) {
        event.preventDefault();
        this.setState({ modify_kapacitas_new: event.target.value });
    }

    modify_enterClassroomComputer(event) {
        event.preventDefault();
        this.setState({ modify_gepterem_e_new: event.target.value });
    }

    async modify_classroom(event) {
        event.preventDefault();
        let classroomNameRegex = /^[a-záéúőóüöíA-ZÁÉÚŐÓÜÖÍ0-9]*$/;
        let classroomCapacityRegex = /^[0-9]*$/;

        if (this.state.modify_teremszam_new.length > 4 || this.state.modify_teremszam_new.length <= 0 || !classroomNameRegex.test(this.state.modify_teremszam_new)
            || this.state.modify_kapacitas_new > 999 || this.state.modify_kapacitas_new <= 0 || !classroomCapacityRegex.test(this.state.modify_kapacitas_new)
            || this.state.modify_gepterem_e_new > 1 || this.state.modify_gepterem_e_new < 0) {
            alert("Nem megfelelő adatok!");
        } else {
            Axios.post("http://localhost:4000/modify/classroom", {
                new_teremszam: this.state.modify_teremszam_new,
                old_teremszam: this.state.modify_teremszam,
                new_kapacitas: this.state.modify_kapacitas_new,
                new_gepterem_e: this.state.modify_gepterem_e_new
            })
                .then(async resp => {
                    console.log("Classroom modified successfully");
                    alert("Tanterem módosítása sikeres!");
                    this.setState({
                        modify_teremszam: "",
                        modify_teremszam_new: "",
                        modify_kapacitas_new: "",
                        modify_gepterem_e_new: ""
                    });
                    await this.fetchDataClassrooms();
                })
                .catch(err => {
                    console.log("Error in ModifyClassrooms modify_classroom");
                    alert("Hiba történt");
                });
        }
    }

    // Post delete
    delete_chosenClassroom(event) {
        event.preventDefault();
        this.setState({ delete_classroom: event.target.value });
    }

    async delete_classroom(event) {
        event.preventDefault();

        Axios.post("http://localhost:4000/delete/classroom", {
            teremszam: this.state.delete_classroom
        })
            .then(async resp => {
                console.log("Classroom deleted successfully");
                alert("Tanterem törlése sikeres!");
                this.setState({ delete_classroom: "" });
                await this.fetchDataClassrooms();
            })
            .catch(err => {
                console.log("Error in ModifyClassroom delete_classroom");
                alert("Hiba történt");
            });
    }

    render() {
        return (
            <main className="admin">
                <h1>Tantermek módosítása</h1>

                <button className="accordion" id="addclassroom" onClick={(e) => accordion(e.target.id)}>Tanterem hozzáadása</button>
                <div className="panel">
                    <form onSubmit={this.add_classroom.bind(this)}>
                        Tanterem száma:<br />
                        <input type="text" value={this.state.add_teremszam} onChange={this.add_enterClassroomNumber.bind(this)} placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" value={this.state.add_kapacitas} onChange={this.add_enterClassroomCapacity.bind(this)} placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select value={this.state.add_gepterem_e} onChange={this.add_enterClassroomComputer.bind(this)}>
                            <option value="" selected disabled></option>
                            <option value="1">Igen</option>
                            <option value="0">Nem</option>
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifyclassroom" onClick={(e) => accordion(e.target.id)}>Tanterem módosítása</button>
                <div className="panel">
                    <form onSubmit={this.modify_classroom.bind(this)}>
                        Módosítandó terem kiválasztása:
                        <select value={this.state.modify_teremszam} onChange={this.modify_chosenClassroom.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        Tanterem száma:<br />
                        <input type="text" value={this.state.modify_teremszam_new} onChange={this.modify_enterClassroomNumber.bind(this)} placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" value={this.state.modify_kapacitas_new} onChange={this.modify_enterClassroomCapacity.bind(this)} placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select value={this.state.modify_gepterem_e_new} onChange={this.modify_enterClassroomComputer.bind(this)}>
                            <option value="" selected disabled></option>
                            <option value="1">Igen</option>
                            <option value="0">Nem</option>
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deleteclassroom" onClick={(e) => accordion(e.target.id)}>Tanterem törlése</button>
                <div className="panel">
                    <form onSubmit={this.delete_classroom.bind(this)}>
                        Törlendő tanterem kiválasztása:
                        <select value={this.state.delete_classroom} onChange={this.delete_chosenClassroom.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.classrooms}
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