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
                <td>{this.state.lessons[1]}</td>
                <td>{this.state.lessons[2]}</td>
                <td>{this.state.lessons[3]}</td>
                <td>{this.state.lessons[4]}</td>
                <td>{this.state.lessons[5]}</td>
            </tr>
        )
    };
}