import React, { Component } from 'react';
import Axios from 'axios';
import ClassComponent from './ClassComponent';

export default class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: []
        }
    }

    async fetchData(orderBy = "") {
        let classes = [];
        await Axios.get(`http://localhost:4000/classes/${orderBy}`)
             .then(response => {
                    response.data.forEach(classc => {
                    classes.push(<ClassComponent classc = {classc}/>);
                 });
             })
             .catch(error => { console.log("Error in ClassList fetchData") });
        this.setState({ classes: classes });
    }

    async fetchDataDesc(orderBy = "") {
        let classes = [];
        await Axios.get(`http://localhost:4000/classes/${orderBy}/desc`)
             .then(response => {
                    response.data.forEach(classc => {
                    classes.push(<ClassComponent classc = {classc}/>);
                 });
             })
             .catch(error => { console.log("Error in ClassList fetchDataDesc") });
        this.setState({ classes: classes });
    }

    async componentDidMount() {
        await this.fetchData();
    };
    
    async changeOrderClass(orderBy, e) {
        e.preventDefault();
        this.setState({classes: []});
        await this.fetchData(orderBy);
    }

    async changeOrderClassDesc(orderBy, e) {
        e.preventDefault();
        this.setState({classes: []});
        await this.fetchDataDesc(orderBy);
    }


    render() {
        return (
            <main>
                <div>
                    <h1>Osztályok</h1>
                    
                    <div>
                        <h2>Lista rendezése</h2>
                        <h3>Növekvő sorrend</h3>
                        <button onClick={(e) => this.changeOrderClass("osztaly_id", e)}>Osztály</button>
                        <button onClick={(e) => this.changeOrderClass("kezdes_eve", e)}>Kezdés éve</button>
                        <button onClick={(e) => this.changeOrderClass("vegzes_eve", e)}>Végzés éve</button>
                        <button onClick={(e) => this.changeOrderClass("letszam", e)}>Létszám</button>
                        <button onClick={(e) => this.changeOrderClass("nev", e)}>Osztályfőnök</button>
                        <button onClick={(e) => this.changeOrderClass("teremszam", e)}>Osztályterem</button>
                        <h3>Csökkenő sorrend</h3>
                        <button onClick={(e) => this.changeOrderClassDesc("osztaly_id", e)}>Osztály</button>
                        <button onClick={(e) => this.changeOrderClassDesc("kezdes_eve", e)}>Kezdés éve</button>
                        <button onClick={(e) => this.changeOrderClassDesc("vegzes_eve", e)}>Végzés éve</button>
                        <button onClick={(e) => this.changeOrderClassDesc("letszam", e)}>Létszám</button>
                        <button onClick={(e) => this.changeOrderClassDesc("nev", e)}>Osztályfőnök</button>
                        <button onClick={(e) => this.changeOrderClassDesc("teremszam", e)}>Osztályterem</button>                
                    </div>
                    
                    <h2>Osztályok listája</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Osztály</th>
                                <th>Kezdés éve</th>
                                <th>Végzés éve</th>
                                <th>Létszám</th>
                                <th>Osztályfőnök</th>
                                <th>Osztályterem</th>
                            </tr>
                            {this.state.classes}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}