import React, { Component } from 'react';

export default class LessonCountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: this.props.lessonCount.nev,
            lessons: this.props.lessonCount.hany_orat,
        }
    }

    render() {
        return (
            <p>{this.state.teacher}: {this.state.lessons}</p>
        );
    }
}