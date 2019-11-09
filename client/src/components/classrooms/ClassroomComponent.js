import React, { Component } from 'react';

export default class ClassroomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.classroom.teremszam,
            capacity: this.props.classroom.kapacitas,
            isComputerRoom: this.props.classroom.gepterem_e
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.roomId}</td>
                <td>{this.state.capacity}</td>
                <td>{this.state.isComputerRoom ? "✅" : "❌"}</td>
            </tr>
        );
    }
}