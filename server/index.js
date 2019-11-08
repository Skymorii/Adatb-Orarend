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

// Admin login
let admin = {
    username: "admin",
    password: "admin"
}

server.post("/login", jsonParser, (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    if (admin.username === req.body.username && admin.password === req.body.password) {
        res.status(200).send();
    } else {
        res.status(403).send();
    }
});

// MySQL queries

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
    let q = `SELECT tanar.pedagogus_id, tanar.nev, tanitott_targyak.targynev
            FROM tanar, tanitott_targyak
            WHERE tanar.pedagogus_id = tanitott_targyak.pedagogus_id`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/teachers/:orderby", (req, res) => {
    let q = `SELECT tanar.pedagogus_id, tanar.nev, tanitott_targyak.targynev
            FROM tanar, tanitott_targyak
            WHERE tanar.pedagogus_id = tanitott_targyak.pedagogus_id
            AND tanitott_targyak.targynev != "osztályfőnöki"
            ORDER BY ${req.params.orderby} ASC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/teachers/:orderby/desc", (req, res) => {
    let q = `SELECT tanar.pedagogus_id, tanar.nev, tanitott_targyak.targynev
            FROM tanar, tanitott_targyak
            WHERE tanar.pedagogus_id = tanitott_targyak.pedagogus_id
            AND tanitott_targyak.targynev != "osztályfőnöki"
            ORDER BY ${req.params.orderby} DESC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

// Classes
server.get("/classes", (_req, res) => {
    let q = `SELECT osztaly.osztaly_id, osztaly.kezdes_eve, osztaly.vegzes_eve, osztaly.letszam, tanar.nev, osztaly.teremszam
            FROM osztaly, tanar
            WHERE osztaly.pedagogus_id = tanar.pedagogus_id`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/classes/:orderby", (req, res) => {
    let q = `SELECT osztaly.osztaly_id, osztaly.kezdes_eve, osztaly.vegzes_eve, osztaly.letszam, tanar.nev, osztaly.teremszam
            FROM osztaly, tanar
            WHERE osztaly.pedagogus_id = tanar.pedagogus_id
            ORDER BY ${req.params.orderby} ASC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

server.get("/classes/:orderby/desc", (req, res) => {
    let q = `SELECT osztaly.osztaly_id, osztaly.kezdes_eve, osztaly.vegzes_eve, osztaly.letszam, tanar.nev, osztaly.teremszam
            FROM osztaly, tanar
            WHERE osztaly.pedagogus_id = tanar.pedagogus_id
            ORDER BY ${req.params.orderby} DESC`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});

// Schedules
server.get("/schedule", (_req, res) => {
    let q = `SELECT ora.ora, ora.nap, ora.nev
            FROM ora
            WHERE ora.osztaly_id = '11a'`

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
    });
});