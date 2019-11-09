import React, { Component } from 'react';

export default class TeacherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.teacher.pedagogus_id,
            name: this.props.teacher.nev,
            subjects: this.props.teacher.targyak
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.id}</td>
                <td>{this.state.name}</td>
                <td>{this.state.subjects}</td>
            </tr>
        );
    }
}