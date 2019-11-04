const express = require('express');
const sql = require("mysql");
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();

// Creating server and connection
const server = express();

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orarend'
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    db.connect((err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });

    console.log("Server is running on port " + port);
});

// CORS enable (from Stackoverflow)
server.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Just for testing connection with database
server.get("/test", (_req, res) => {
    db.query("SELECT * FROM osztaly", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });
});

// SQL queries

// Classrooms
server.get("/classrooms", (_req, res) => {
    let q = "SELECT * FROM terem"

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/classrooms/:orderby", (req, res) => {
    let q = `SELECT * FROM terem ORDER BY ${req.params.orderby} ASC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/classrooms/:orderby/desc", (req, res) => {
    let q = `SELECT * FROM terem ORDER BY ${req.params.orderby} DESC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

// Teachers
server.get("/teachers", (_req, res) => {
    let q = "SELECT * from tanar"

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/teachers/:orderby", (req, res) => {
    let q = `SELECT * FROM tanar ORDER BY ${req.params.orderby} ASC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/teachers/:orderby/desc", (req, res) => {
    let q = `SELECT * FROM tanar ORDER BY ${req.params.orderby} DESC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});