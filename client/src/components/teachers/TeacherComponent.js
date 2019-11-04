import React, { Component } from 'react';

export default class TeacherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pedagogus_id: this.props.teacher.pedagogus_id,
            nev: this.props.teacher.nev
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.pedagogus_id}</td>
                <td>{this.state.nev}</td>
            </tr>
        );
    }
}