import React, { Component } from 'react';
import Axios from 'axios';
import './admin.css'

function accordion(id) {
    var acc = document.getElementById(id);
    
    acc.classList.toggle("active");

    var panel = acc.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

export default class AdminComponent extends Component {
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

    // Methods for lessons
    async fetchDataLessons() {
        let temp = [];
        await Axios.get(`http://localhost:4000/lessons`)
            .then(response => {    
                response.data.forEach(lesson => {
                temp.push(<option value={lesson.teremszam+lesson.nap+lesson.ora}>Nap: {lesson.nap} - Óra: {lesson.ora} - Terem: {lesson.teremszam}</option>);
                });
             })
             .catch(error => { console.log("Error in AdminComponent fetchDataClasses") });
        console.log(temp);
        this.setState({ lessons: temp });
    }

    // Methods for classes
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

    // Methods for teachers
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


    // Methods for classrooms
    async fetchDataClassrooms() {
        let temp = [];
        await Axios.get(`http://localhost:4000/classrooms`)
            .then(response => {    
                response.data.forEach(room => {
                temp.push(<option value={room.teremszam}>Teremszám: {room.teremszam} - Kapacitás: {room.kapacitas} - Gépterem: {room.gepterem_e  ? "✅" : "❌"}</option>);
                });
             })
             .catch(error => { console.log("Error in AdminComponent fetchDataClassrooms") });
        console.log(temp);
        this.setState({ classrooms: temp });
    }


    // Other methods
    async componentDidMount() {
        await this.fetchDataLessons();
        await this.fetchDataClasses();
        await this.fetchDataTeachers();
        await this.fetchDataSubjects();
        await this.fetchDataClassrooms();
    }

    render() {
        return (
            <main id="admin">
                <h1>Admin felület</h1>
                <h2>Adatok módosítása</h2>

                <button className="accordion" id="mschedules" onClick={(e) => accordion(e.target.id)}>Órarendek módosítása</button>
                <div className="panel">
                    <h3>Új óra hozzáadása</h3>
                    <form name="addnewlesson">
                        Terem: 
                        <select name="chooseclassroom_addnewlesson">
                            {this.state.classrooms}
                        </select>
                        Nap:
                        <select name="chooseday_addnewlesson">
                            <option value="Hétfő">Hétfő</option>
                            <option value="Kedd">Kedd</option>
                            <option value="Szerda">Szerda</option>
                            <option value="Csütörtök">Csütörtök</option>
                            <option value="Péntek">Péntek</option>
                        </select>
                        Óra:
                        <input type="number" name="ora" placeholder="Óra" min="0" max="8" required /> <br />
                        Osztály:
                        <select name="chooseclass_addnewlesson">
                            {this.state.classes}
                        </select>
                        Tanár:
                        <select name="chooseteacher_addnewlesson">
                            {this.state.teachers}
                        </select>
                        Tantárgy:
                        <select name="choosesubject_addnewlesson">
                            {this.state.subjects}
                        </select>

                        <input type="submit" value="Hozzáadás" />
                    </form>

                    <hr/>

                    <h3>Óra módosítása</h3>
                    <form name="modifylesson">
                        Módosítandó tantárgy kiválasztása:
                        <select name="chooselessonttomodify">
                            {this.state.lessons}
                        </select>
                        Terem: 
                        <select name="chooseclassroom_modifynewlesson">
                            {this.state.classrooms}
                        </select>
                        Nap:
                        <select name="chooseday_addnewlesson">
                            <option value="Hétfő">Hétfő</option>
                            <option value="Kedd">Kedd</option>
                            <option value="Szerda">Szerda</option>
                            <option value="Csütörtök">Csütörtök</option>
                            <option value="Péntek">Péntek</option>
                        </select>
                        Óra:
                        <input type="number" name="ora" placeholder="Óra" min="0" max="8" required /> <br />
                        Osztály:
                        <select name="chooseclass_modifynewlesson">
                            {this.state.classes}
                        </select>
                        Tanár:
                        <select name="chooseteacher_modifynewlesson">
                            {this.state.teachers}
                        </select>
                        Tantárgy:
                        <select name="choosesubject_modifynewlesson">
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                    
                    <hr/>

                    <h3>Óra törlése</h3>
                    <form name="deletelesson">
                        Törlendő tantárgy kiválasztása:
                        <select name="chooselessontodelete">
                            <option selected disabled></option>
                            {this.state.lessons}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>



                <button className="accordion" id="mclass" onClick={(e) => accordion(e.target.id)}>Osztályok módosítása</button>
                <div className="panel">
                    <h3>Új osztály hozzáadása</h3>
                    <form name="addnewclass">
                        Osztály ID:<br />
                        <input type="text" name="osztaly_id" placeholder="Osztály ID" maxLength="3" required /> <br />
                        Kezdés éve:<br />
                        <input type="number" name="kezdes_eve" placeholder="Kezdés éve" min="0" max="9999" required /> <br />
                        Végzés éve:<br />
                        <input type="number" name="vegzes_eve" placeholder="Végzés éve" min="0" max="9999" required /> <br />
                        Létszám:<br />
                        <input type="number" name="letszam" placeholder="Létszám" min="5" max="40" required /> <br />
                        Osztályfőnök
                        <select name="chooseclassmaster_addnewclass">
                            {this.state.teachers}
                        </select>
                        Osztályterem: 
                        <select name="chooseclassroom_addnewclass">
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>

                    <hr/>

                    <h3>Osztály módosítása</h3>
                    <form name="modifyclass">
                        Módosítandó osztály kiválasztása:
                        <select name="chooseclasstomodify">
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
                        <select name="chooseclassmaster_modifyclass">
                            {this.state.teachers}
                        </select>
                        Osztályterem: 
                        <select name="chooseclassroom_modifyclass">
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>

                    <hr/>

                    <h3>Osztály törlése</h3>
                    <form name="deleteclass">
                        Törlendő osztály kiválasztása:
                        <select name="chooseclasstodelete">
                            <option selected disabled></option>
                            {this.state.classes}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>



                <button className="accordion" id="mteachers" onClick={(e) => accordion(e.target.id)}>Tanárok módosítása</button>
                <div className="panel">
                    <h3>Új tanár hozzáadása</h3>
                    <form name="addnewteacher">
                        Pedagógus ID:<br />
                        <input type="text" name="pedagogus_id" placeholder="Pedagógus ID" maxLength="8" required /> <br />
                        Teljes név:<br />
                        <input type="text" name="nev" placeholder="Teljes név" min="1" max="255" required /> <br />
                        Tanított tárgyak:<br />
                        <select name="targy1">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <select name="targy2">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>

                    <hr/>

                    <h3>Tanár módosítása</h3>
                    <form name="modifyteacher">
                        Módosítandó tanár kiválasztása:
                        <select name="chooseteachertomodify">
                            {this.state.teachers}
                        </select>
                        Pedagógus ID:<br />
                        <input type="text" name="pedagogus_id" placeholder="Pedagógus ID" maxLength="8" required /> <br />
                        Teljes név:<br />
                        <input type="text" name="nev" placeholder="Teljes név" min="1" max="255" required /> <br />
                        Tanított tárgyak:<br />
                        <select name="targy1">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <select name="targy2">
                            <option selected disabled></option>
                            {this.state.subjects}
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>
                    
                    <hr/>

                    <h3>Tanár törlése</h3>
                    <form name="deleteteacher">
                        Törlendő tanár kiválasztása:
                        <select name="chooseteachertodelete">
                            <option selected disabled></option>
                            {this.state.teachers}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>



                <button className="accordion" id="mclassrooms" onClick={(e) => accordion(e.target.id)}>Tantermek módosítása</button>
                <div className="panel">
                    <h3>Új tanterem hozzáadása</h3>
                    <form name="addnewclassroom">
                        Tanterem száma:<br />
                        <input type="text" name="teremszam" placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" name="kapacitas" placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select name="gepterem_e">
                            <option value="1">Igen</option>
                            <option value="0" selected>Nem</option>
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>

                    <hr/>

                    <h3>Tanterem módosítása</h3>
                    <form name="modifiyclassroom">
                        Módosítandó terem kiválasztása: 
                        <select name="chooseclassroomtomodify">
                            {this.state.classrooms}
                        </select>
                        Tanterem száma:<br />
                        <input type="text" name="teremszam" placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" name="kapacitas" placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select name="gepterem_e">
                            <option value="1">Igen</option>
                            <option value="0" selected>Nem</option>
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>

                    <hr/>

                    <h3>Tanterem törlése</h3>
                    <form name="deleteclassroom">
                        Törlendő tanterem kiválasztása:
                        <select name="chooseclassroomtodelete">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>

                <button className="accordion" id="mclassrooms" onClick={(e) => accordion(e.target.id)}>Tantermek módosítása</button>
                <div className="panel">
                    <h3>Új tanterem hozzáadása</h3>
                    <form name="addnewclassroom">
                        Tanterem száma:<br />
                        <input type="text" name="teremszam" placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" name="kapacitas" placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select name="gepterem_e">
                            <option value="1">Igen</option>
                            <option value="0" selected>Nem</option>
                        </select>
                        <input type="submit" value="Hozzáadás" />
                    </form>

                    <hr/>

                    <h3>Tanterem módosítása</h3>
                    <form name="modifiyclassroom">
                        Módosítandó terem kiválasztása: 
                        <select name="chooseclassroomtomodify">
                            {this.state.classrooms}
                        </select>
                        Tanterem száma:<br />
                        <input type="text" name="teremszam" placeholder="Teremszám" maxLength="4" required /> <br />
                        Tanterem kapacitása:<br />
                        <input type="number" name="kapacitas" placeholder="Kapacitás" min="1" max="999" required /> <br />
                        Gépterem?<br />
                        <select name="gepterem_e">
                            <option value="1">Igen</option>
                            <option value="0" selected>Nem</option>
                        </select>
                        <input type="submit" value="Módosítás" />
                    </form>

                    <hr/>

                    <h3>Tanterem törlése</h3>
                    <form name="deleteclassroom">
                        Törlendő tanterem kiválasztása:
                        <select name="chooseclassroomtodelete">
                            <option selected disabled></option>
                            {this.state.classrooms}
                        </select>
                        <input type="submit" value="Törlés" className="deletebtn" />
                    </form>
                </div>



                <button className="accordion" id="msibjects" onClick={(e) => accordion(e.target.id)}>Tantágyak módosítása</button>
                <div className="panel">
                    <h3>Új tantárgy hozzáadása</h3>
                    <form name="addnewsubject">
                        Tanárgy neve:<br />
                        <input type="text" name="nev" placeholder="Tantárgy neve" maxLength="255" required /> <br />
                        <input type="submit" value="Hozzáadás" />
                    </form>

                    <hr/>

                    <h3>Tantárgy módosítása</h3>
                    <form name="modifysubject">
                        Módosítandó tantárgy kiválasztása:
                        <select name="choosesubjecttomodify">
                            {this.state.subjects}
                        </select>
                        Tanárgy neve:<br />
                        <input type="text" name="nev" placeholder="Tantárgy neve" maxLength="255" required /> <br />
                        <input type="submit" value="Módosítás" />
                    </form>
                    
                    <hr/>

                    <h3>Tantárgy törlése</h3>
                    <form name="deletesubject">
                        Törlendő tantárgy kiválasztása:
                        <select name="choosesubjecttodelete">
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