import React, { Component } from 'react';

export default class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.classc.osztaly_id,
            begin: this.props.classc.kezdes_eve,
            end: this.props.classc.vegzes_eve,
            number: this.props.classc.letszam,
            classmaster: this.props.classc.nev,
            classroom: this.props.classc.teremszam
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.id}</td>
                <td>{this.state.begin}</td>
                <td>{this.state.end}</td>
                <td>{this.state.number}</td>
                <td>{this.state.classmaster}</td>
                <td>{this.state.classroom}</td>
            </tr>
        );
    }
}