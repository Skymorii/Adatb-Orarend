import React, { Component } from 'react';

export default class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            osztaly_id: this.props.classc.osztaly_id,
            kezdes_eve: this.props.classc.kezdes_eve,
            vegzes_eve: this.props.classc.vegzes_eve,
            letszam: this.props.classc.letszam,
            nev: this.props.classc.nev,
            teremszam: this.props.classc.teremszam
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.osztaly_id}</td>
                <td>{this.state.kezdes_eve}</td>
                <td>{this.state.vegzes_eve}</td>
                <td>{this.state.letszam}</td>
                <td>{this.state.nev}</td>
                <td>{this.state.teremszam}</td>
            </tr>
        );
    }
}