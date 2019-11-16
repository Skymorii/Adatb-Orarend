import React, { Component } from 'react';
import Axios from 'axios';
import { accordion } from './AdminComponent';
import './admin.css'

export default class ModifyClassrooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classrooms: []
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

    render() {
        return (
            <main className="admin">
                <h1>Tantermek módosítása</h1>

                <button className="accordion" id="addclassroom" onClick={(e) => accordion(e.target.id)}>Tanterem hozzáadása</button>
                <div className="panel">
                    <form name="addclassroom">
                        Tanterem száma:<br />
                        <input type="text" name="teremszam" placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" name="kapacitas" placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select name="gepterem_e">
                            <option selected disabled></option>
                            <option value="1">Igen</option>
                            <option value="0">Nem</option>
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>
                </div>


                <button className="accordion" id="modifyclassroom" onClick={(e) => accordion(e.target.id)}>Tanterem módosítása</button>
                <div className="panel">
                    <form name="modifiyclassroom">
                        Módosítandó terem kiválasztása:
                        <select name="teremszam_tomodify">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        Tanterem száma:<br />
                        <input type="text" name="teremszam" placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" name="kapacitas" placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select name="gepterem_e">
                            <option selected disabled></option>
                            <option value="1">Igen</option>
                            <option value="0">Nem</option>
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                </div>


                <button className="accordion" id="deleteclassroom" onClick={(e) => accordion(e.target.id)}>Tanterem törlése</button>
                <div className="panel">
                    <form name="deleteclassroom">
                        Törlendő tanterem kiválasztása:
                        <select name="teremszam_todelete">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>
            </main>
        );
    }
}