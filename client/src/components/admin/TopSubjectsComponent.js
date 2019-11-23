import React, { Component } from 'react';

export default class TopSubjectsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: this.props.topSubject.nev,
            teachers: this.props.topSubject.tanarok
        }
    }

    render() {
        return (
            <p>{this.state.subject}: {this.state.teachers}</p>
        );
    }
}