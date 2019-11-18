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
            classrooms: []
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

    render() {
        return (
            <main className="admin">
                <h1>Osztályok módosítása</h1>

                <button className="accordion" id="addclass" onClick={(e) => accordion(e.target.id)}>Osztály hozzáadása</button>
                <div className="panel">
                    <form name="addclass">
                        Osztály ID:<br />
                        <input type="text" name="osztaly_id" placeholder="Osztály ID" maxLength="3" required /> <br />
                        Kezdés éve:<br />
                        <input type="number" name="kezdes_eve" placeholder="Kezdés éve" min="0" max="9999" required /> <br />
                        Végzés éve:<br />
                        <input type="number" name="vegzes_eve" placeholder="Végzés éve" min="0" max="9999" required /> <br />
                        Létszám:<br />
                        <input type="number" name="letszam" placeholder="Létszám" min="5" max="40" required /> <br />
                        Osztályfőnök
                        <select name="pedagogus_id">
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Osztályterem:
                        <select name="teremszam">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifyclass" onClick={(e) => accordion(e.target.id)}>Osztály módosítása</button>
                <div className="panel">
                    <form name="modifyclass">
                        Módosítandó osztály kiválasztása:
                        <select name="osztaly_id_tomodify">
                            <option selected disabled></option>
                            {this.state.classes}
                        </select>
                        Osztály ID:<br />
                        <input type="text" name="osztaly_id" placeholder="Osztály ID" maxLength="3" required /> <br />
                        Kezdés éve:<br />
                        <input type="number" name="kezdes_eve" placeholder="Kezdés éve" min="0" max="9999" required /> <br />
                        Végzés éve:<br />
                        <input type="number" name="vegzes_eve" placeholder="Végzés éve" min="0" max="9999" required /> <br />
                        Létszám:<br />
                        <input type="number" name="letszam" placeholder="Létszám" min="5" max="40" required /> <br />
                        Osztályfőnök
                        <select name="pedagogus_id">
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        Osztályterem:
                        <select name="teremszam">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deleteclass" onClick={(e) => accordion(e.target.id)}>Osztály törlése</button>
                <div className="panel">
                    <form name="deleteclass">
                        Törlendő osztály kiválasztása:
                        <select name="osztaly_id_todelete">
                            <option selected disabled></option>
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