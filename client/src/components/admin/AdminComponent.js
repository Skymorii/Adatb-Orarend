import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import LessonCountComponent from './LessonCountComponent';
import TopSubjectsComponent from './TopSubjectsComponent';
import Schedule from '../index/schedule.png'
import Teacher from '../index/teacher.png'
import Classroom from '../index/room.png'
import Class from '../index/class.png'
import Subject from './subject.png'
import './admin.css'

export function accordion(id) {
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
            avgSubjects: [{ atlag: 0, min: 0, max: 0 }],
            avgLessons: [{ atlag: 0, min: 0, max: 0 }],
            lessonCount: [],
            topSubjects: []
        }
    }

    async fetchDataAvgSubjects() {
        let temp = "";
        await Axios.get(`http://localhost:4000/avgsubjects`)
            .then(response => {
                temp = response.data;
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataAvgSubjects") });
        this.setState({ avgSubjects: temp });
    }

    async fetchDataAvgLessons() {
        let temp = "";
        await Axios.get(`http://localhost:4000/avglessons`)
            .then(response => {
                temp = response.data;
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataAvgLessons") });
        this.setState({ avgLessons: temp });
    }

    async fetchDataLessonCount() {
        let lessonCount = [];
        await Axios.get(`http://localhost:4000/howmanylessons`)
            .then(response => {
                response.data.forEach(count => {
                    lessonCount.push(<LessonCountComponent lessonCount={count} />);
                });
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataLessonCount") });
        this.setState({ lessonCount: lessonCount });
    }

    async fetchDataTopSubjects() {
        let topSubjects = [];
        await Axios.get(`http://localhost:4000/topsubjects`)
            .then(response => {
                response.data.forEach(topSubject => {
                    topSubjects.push(<TopSubjectsComponent topSubject={topSubject} />);
                });
            })
            .catch(error => { console.log("Error in AdminComponent fetchDataTopSubjects") });
        this.setState({ topSubjects: topSubjects });
    }

    async componentDidMount() {
        await this.fetchDataAvgSubjects();
        await this.fetchDataAvgLessons();
        await this.fetchDataLessonCount();
        await this.fetchDataTopSubjects();
    }

    render() {
        return (
            <main className="admin" id="mainadmin">
                <h1>Admin felület</h1>

                <button className="accordion" id="data" onClick={(e) => accordion(e.target.id)}>Adatok</button>
                <div className="panel">
                        <h4>Tanított tárgyak</h4>
                        <p>Minimum: {this.state.avgSubjects[0].min}</p>
                        <p>Maximum: {this.state.avgSubjects[0].max}</p>
                        <p>Átlag: {this.state.avgSubjects[0].atlag}</p>

                        <h4>Tartott órák</h4>
                        <p>Minimum: {this.state.avgLessons[0].min}</p>
                        <p>Maximum: {this.state.avgLessons[0].max}</p>
                        <p>Átlag: {this.state.avgLessons[0].atlag}</p>

                        <h4>Legtöbbet tartott órák</h4>
                        {this.state.topSubjects}

                        <h4>Óraszámok</h4>
                        {this.state.lessonCount}
                </div>

                <div className="vdivider"></div>

                <h2>Adatok módosítása</h2>

                <div>
                    <Link to="/modify_lessons">
                        <div className="tile" id="modify_lessons">
                            <img src={Schedule} alt="órarendek" />
                            Tanórák módosítása
                        </div>
                    </Link>

                    <Link to="/modify_classes">
                        <div className="tile" id="modify_classes">
                            <img src={Class} alt="osztályok" />
                            Osztályok módosítása
                        </div>
                    </Link>

                    <Link to="/modify_teachers">
                        <div className="tile" id="modify_teachers">
                            <img src={Teacher} alt="tanárok" />
                            Tanárok módosítása
                        </div>
                    </Link>

                    <Link to="/modify_classrooms">
                        <div className="tile" id="modify_classrooms">
                            <img src={Classroom} alt="tantermek" />
                            Tantermek módosítása
                        </div>
                    </Link>

                    <Link to="/modify_subjects">
                        <div className="tile" id="modify_subjects">
                            <img src={Subject} alt="tantárgyak" />
                            Tantárgyak módosítása
                        </div>
                    </Link>
                </div>
            </main>
        );
    }
}