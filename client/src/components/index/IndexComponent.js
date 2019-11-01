import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Schedule from './schedule.png'
import Teacher from './teacher.png'
import Classroom from './room.png'
import Class from './class.png'
import './index.css'

export default class IndexComponent extends Component {
    render() {
        return (
            <main>
                <div id="indexpage">
                    <Link to="/schedules">
                        <div className="tile" id="schedules">
                            <img src={Schedule} alt="órarendek" />
                            <div class="divider"></div>
                            Órarendek
                        </div>
                    </Link>
                    
                    <Link to="/classes">
                        <div className="tile" id="classes">
                            <img src={Class} alt="osztályok" />
                            <div className="divider"></div>
                            Osztályok
                        </div>
                    </Link>
                    
                    <Link to="/teachers">
                        <div className="tile" id="teachers">
                            <img src={Teacher} alt="tanárok" />                    
                            <div className="divider"></div>
                            Tanárok
                        </div>
                    </Link>
                    
                    <Link to="/classrooms">
                        <div className="tile" id="rooms">
                            <img src={Classroom} alt="tantermek" />
                            <div className="divider"></div>
                            Tantermek
                        </div>
                    </Link>
                </div>
            </main>
        )
    }
}