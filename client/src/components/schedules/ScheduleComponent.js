import React, { Component } from 'react';

export default class ScheduleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: this.props.lessons
        }
    }

    render() {
        return (
            <tr>
                <td className="lessonnum">{this.state.lessons[0]}</td>
                <td>
                    <p className="subject">{this.state.lessons[1].nev}</p>
                    <p className="teacher">{this.state.lessons[1].tanar}</p>
                    <p className="classroom">{this.state.lessons[1].teremszam}</p>
                </td>
                <td>
                    <p className="subject">{this.state.lessons[2].nev}</p>
                    <p className="teacher">{this.state.lessons[2].tanar}</p>
                    <p className="classroom">{this.state.lessons[2].teremszam}</p>
                </td>
                <td>
                    <p className="subject">{this.state.lessons[3].nev}</p>
                    <p className="teacher">{this.state.lessons[3].tanar}</p>
                    <p className="classroom">{this.state.lessons[3].teremszam}</p>
                </td>
                <td>
                    <p className="subject">{this.state.lessons[4].nev}</p>
                    <p className="teacher">{this.state.lessons[4].tanar}</p>
                    <p className="classroom">{this.state.lessons[4].teremszam}</p>
                </td>
                <td>
                    <p className="subject">{this.state.lessons[5].nev}</p>
                    <p className="teacher">{this.state.lessons[5].tanar}</p>
                    <p className="classroom">{this.state.lessons[5].teremszam}</p>
                </td>
            </tr>
        )
    };
}