const express = require('express');
const sql = require("mysql");
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();

const server = express();

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orarend'
});

server.listen(3000, () => {
    db.connect((err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });

    console.log("Server is running on port 3000")
});

// CORS enable (from Stackoverflow)
server.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get("/schedule", (_req, res) => {
    db.query("SELECT * FROM osztaly", (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });
});