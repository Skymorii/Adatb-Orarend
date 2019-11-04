import React, { Component } from 'react';

export default class ClassroomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teremszam: this.props.classroom.teremszam,
            kapacitas: this.props.classroom.kapacitas,
            gepterem_e: this.props.classroom.gepterem_e
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.teremszam}</td>
                <td>{this.state.kapacitas}</td>
                <td>{this.state.gepterem_e ? "Igen" : "Nem"}</td>
            </tr>
        );
    }
}