import React, { Component } from 'react';

export default class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.classid.osztaly_id,
            beginYear: this.props.classid.kezdes_eve,
            endYear: this.props.classid.vegzes_eve,
            number: this.props.classid.letszam,
            classmaster: this.props.classid.nev,
            classroom: this.props.classid.teremszam
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.id}</td>
                <td>{this.state.beginYear}</td>
                <td>{this.state.endYear}</td>
                <td>{this.state.number}</td>
                <td>{this.state.classmaster}</td>
                <td>{this.state.classroom}</td>
            </tr>
        );
    }
}