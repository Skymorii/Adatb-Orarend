import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    render() {
        return (
            <main className="admin" id="mainadmin">
                <h1>Admin felület</h1>
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