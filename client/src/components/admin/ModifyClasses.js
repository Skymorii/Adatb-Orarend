import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { accordion } from './AdminComponent';
import './admin.css'

export default class ModifyClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            teachers: [],
            classrooms: [],

            add_osztaly_id: "",
            add_kezdes_eve: "",
            add_vegzes_eve: "",
            add_letszam: "",
            add_pedagogus_id: "",
            add_teremszam: "",

            modify_osztaly_id: "",
            modify_osztaly_id_new: "",
            modify_kezdes_eve_new: "",
            modify_vegzes_eve_new: "",
            modify_letszam_new: "",
            modify_pedagogus_id_new: "",
            modify_teremszam_new: "",

            delete_class: ""
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
            .catch(error => { console.log("Error in ModifyClasses fetchDataClasses") });
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
            .catch(error => { console.log("Error in ModifyClasses fetchDataTeachers") });
        this.setState({ teachers: temp });
    }

    async fetchDataClassrooms() {
        let temp = [];
        await Axios.get(`http://localhost:4000/classrooms`)
            .then(response => {
                response.data.forEach(room => {
                    temp.push(<option value={room.teremszam}>Teremszám: {room.teremszam} - Kapacitás: {room.kapacitas} - Gépterem: {room.gepterem_e ? "✅" : "❌"}</option>);
                });
            })
            .catch(error => { console.log("Error in ModifyClasses fetchDataClassrooms") });
        this.setState({ classrooms: temp });
    }

    async componentDidMount() {
        await this.fetchDataClasses();
        await this.fetchDataTeachers();
        await this.fetchDataClassrooms();
    }

    // Post add
    add_enterClassID(event) {
        event.preventDefault();
        this.setState({ add_osztaly_id: event.target.value });
    }

    add_enterClassBegin(event) {
        event.preventDefault();
        this.setState({ add_kezdes_eve: event.target.value });
    }

    add_enterClassEnd(event) {
        event.preventDefault();
        this.setState({ add_vegzes_eve: event.target.value });
    }

    add_enterClassNumber(event) {
        event.preventDefault();
        this.setState({ add_letszam: event.target.value });
    }

    add_enterClassHead(event) {
        event.preventDefault();
        this.setState({ add_pedagogus_id: event.target.value });
    }

    add_enterClassRoom(event) {
        event.preventDefault();
        this.setState({ add_teremszam: event.target.value });
    }

    async add_class(event) {
        event.preventDefault();
        let classRegex = /^[0-9]{1,2}[a-z]$/;

        if (!classRegex.test(this.state.add_osztaly_id)
            || this.state.add_kezdes_eve > 9999 || this.state.add_kezdes_eve <= 0
            || this.state.add_vegzes_eve > 9999 || this.state.add_vegzes_eve <= 0
            || this.state.add_letszam > 99 || this.state.add_letszam <= 0) {
            alert("Nem megfelelő adatok!");
        } else {
            Axios.post("http://localhost:4000/add/class", {
                osztaly_id: this.state.add_osztaly_id,
                kezdes_eve: this.state.add_kezdes_eve,
                vegzes_eve: this.state.add_vegzes_eve,
                letszam: this.state.add_letszam,
                pedagogus_id: this.state.add_pedagogus_id,
                teremszam: this.state.add_teremszam
            })
                .then(async resp => {
                    console.log("Class added successfully");
                    alert("Osztály hozzáadása sikeres!");
                    this.setState({
                        add_osztaly_id: "",
                        add_kezdes_eve: "",
                        add_vegzes_eve: "",
                        add_letszam: "",
                        add_pedagogus_id: "",
                        add_teremszam: ""
                    });
                    await this.fetchDataClasses();
                })
                .catch(err => {
                    console.log("Error in ModifyClasses add_class");
                    alert("Hiba történt");
                });
        }
    }

    // Post modify
    modify_chosenClass(event) {
        event.preventDefault();
        this.setState({ modify_osztaly_id: event.target.value });
    }

    modify_enterClassID(event) {
        event.preventDefault();
        this.setState({ modify_osztaly_id_new: event.target.value });
    }

    modify_enterClassBegin(event) {
        event.preventDefault();
        this.setState({ modify_kezdes_eve_new: event.target.value });
    }

    modify_enterClassEnd(event) {
        event.preventDefault();
        this.setState({ modify_vegzes_eve_new: event.target.value });
    }

    modify_enterClassNumber(event) {
        event.preventDefault();
        this.setState({ modify_letszam_new: event.target.value });
    }

    modify_enterClassHead(event) {
        event.preventDefault();
        this.setState({ modify_pedagogus_id_new: event.target.value });
    }

    modify_enterClassRoom(event) {
        event.preventDefault();
        this.setState({ modify_teremszam_new: event.target.value });
    }

    async modify_class(event) {
        event.preventDefault();
        let classRegex = /^[0-9]{1,2}[a-z]$/;

        if (!classRegex.test(this.state.modify_osztaly_id_new)
            || this.state.modify_kezdes_eve_new > 9999 || this.state.modify_kezdes_eve_new <= 0
            || this.state.modify_vegzes_eve_new > 9999 || this.state.modify_vegzes_eve_new <= 0
            || this.state.modify_letszam_new > 99 || this.state.modify_letszam_new <= 0) {
            alert("Nem megfelelő adatok!");
        } else {
            Axios.post("http://localhost:4000/modify/class", {
                old_osztaly_id: this.state.modify_osztaly_id,
                new_osztaly_id: this.state.modify_osztaly_id_new,
                new_kezdes_eve: this.state.modify_kezdes_eve_new,
                new_vegzes_eve: this.state.modify_vegzes_eve_new,
                new_letszam: this.state.modify_letszam_new,
                new_pedagogus_id: this.state.modify_pedagogus_id_new,
                new_teremszam: this.state.modify_teremszam_new
            })
                .then(async resp => {
                    console.log("Class modified successfully");
                    alert("Osztály módosítása sikeres!");
                    this.setState({
                        modify_osztaly_id: "",
                        modify_osztaly_id_new: "",
                        modify_kezdes_eve_new: "",
                        modify_vegzes_eve_new: "",
                        modify_letszam_new: "",
                        modify_pedagogus_id_new: "",
                        modify_teremszam_new: ""
                    });
                    await this.fetchDataClasses();
                })
                .catch(err => {
                    console.log("Error in ModifyClasses modify_class");
                    alert("Hiba történt");
                });
        }
    }

    // Post delete
    delete_chosenClass(event) {
        event.preventDefault();
        this.setState({ delete_class: event.target.value });
    }

    async delete_class(event) {
        event.preventDefault();

        Axios.post("http://localhost:4000/delete/class", {
            osztaly_id: this.state.delete_class
        })
            .then(async resp => {
                console.log("Class deleted successfully");
                alert("Osztály törlése sikeres!");
                this.setState({ delete_class: "" });
                await this.fetchDataClasses();
            })
            .catch(err => {
                console.log("Error in ModifyClasses delete_class");
                alert("Hiba történt");
            });
    }

    render() {
        return (
            <main className="admin">
                <h1>Osztályok módosítása</h1>

                <button className="accordion" id="addclass" onClick={(e) => accordion(e.target.id)}>Osztály hozzáadása</button>
                <div className="panel">
                    <form onSubmit={this.add_class.bind(this)}>
                        Osztály ID:<br />
                        <input type="text" value={this.state.add_osztaly_id} onChange={this.add_enterClassID.bind(this)} placeholder="Osztály ID" maxLength="3" required /> <br />
                        Kezdés éve:<br />
                        <input type="number" value={this.state.add_kezdes_eve} onChange={this.add_enterClassBegin.bind(this)} placeholder="Kezdés éve" min="0" max="9999" required /> <br />
                        Végzés éve:<br />
                        <input type="number" value={this.state.add_vegzes_eve} onChange={this.add_enterClassEnd.bind(this)} placeholder="Végzés éve" min="0" max="9999" required /> <br />
                        Létszám:<br />
                        <input type="number" value={this.state.add_letszam} onChange={this.add_enterClassNumber.bind(this)} placeholder="Létszám" min="5" max="40" required /> <br />
                        Osztályfőnök
                        <select  value={this.state.add_pedagogus_id} onChange={this.add_enterClassHead.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Osztályterem:
                        <select  value={this.state.add_teremszam} onChange={this.add_enterClassRoom.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifyclass" onClick={(e) => accordion(e.target.id)}>Osztály módosítása</button>
                <div className="panel">
                    <form onSubmit={this.modify_class.bind(this)}>
                        Módosítandó osztály kiválasztása:
                        <select value={this.state.modify_osztaly_id} onChange={this.modify_chosenClass.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.classes}
                        </select>
                        Osztály ID:<br />
                        <input type="text" value={this.state.modify_osztaly_id_new} onChange={this.modify_enterClassID.bind(this)} placeholder="Osztály ID" maxLength="3" required /> <br />
                        Kezdés éve:<br />
                        <input type="number" value={this.state.modify_kezdes_eve_new} onChange={this.modify_enterClassBegin.bind(this)} placeholder="Kezdés éve" min="0" max="9999" required /> <br />
                        Végzés éve:<br />
                        <input type="number" value={this.state.modify_vegzes_eve_new} onChange={this.modify_enterClassEnd.bind(this)} placeholder="Végzés éve" min="0" max="9999" required /> <br />
                        Létszám:<br />
                        <input type="number" value={this.state.modify_letszam_new} onChange={this.modify_enterClassNumber.bind(this)} placeholder="Létszám" min="5" max="40" required /> <br />
                        Osztályfőnök
                        <select value={this.state.modify_pedagogus_id_new} onChange={this.modify_enterClassHead.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Osztályterem:
                        <select value={this.state.modify_teremszam_new} onChange={this.modify_enterClassRoom.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deleteclass" onClick={(e) => accordion(e.target.id)}>Osztály törlése</button>
                <div className="panel">
                    <form onSubmit={this.delete_class.bind(this)}>
                        Törlendő osztály kiválasztása:
                        <select value={this.state.delete_class} onChange={this.delete_chosenClass.bind(this)}>
                            <option value="" selected disabled></option>
                            {this.state.classes}
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