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
    database: 'schedule',
    multipleStatements: true
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
        console.log("GET /test at " + new Date().toLocaleString());
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
        console.log("POST /login (success) at " + new Date().toLocaleString())
    } else {
        res.status(403).send();
        console.log("POST /login (fail) at " + new Date().toLocaleString())
    }
});

// MySQL queries

// Get requests

// Classrooms
server.get("/classrooms", (_req, res) => {
    let q = "SELECT * FROM terem";

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /classrooms at " + new Date().toLocaleString());
    });
});

server.get("/classrooms/:orderby", (req, res) => {
    let q = `SELECT * FROM terem ORDER BY ${req.params.orderby} ASC`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /classrooms/${req.params.orderby} at ` + new Date().toLocaleString());
    });
});

server.get("/classrooms/:orderby/desc", (req, res) => {
    let q = `SELECT * FROM terem ORDER BY ${req.params.orderby} DESC`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /classrooms/${req.params.orderby}/desc at ` + new Date().toLocaleString());
    });
});

// Teachers
server.get("/teachers", (_req, res) => {
    let q = `SELECT tanar.pedagogus_id, tanar.nev, GROUP_CONCAT(tanitott_targyak.targynev SEPARATOR ", ") AS targyak
            FROM tanar, tanitott_targyak
            WHERE tanar.pedagogus_id = tanitott_targyak.pedagogus_id
            AND tanitott_targyak.targynev != "osztályfőnöki"
            GROUP BY tanar.pedagogus_id`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /teachers at " + new Date().toLocaleString());
    });
});

server.get("/teachers/:orderby", (req, res) => {
    let q = `SELECT tanar.pedagogus_id, tanar.nev, GROUP_CONCAT(tanitott_targyak.targynev SEPARATOR ", ") AS targyak
            FROM tanar, tanitott_targyak
            WHERE tanar.pedagogus_id = tanitott_targyak.pedagogus_id
            AND tanitott_targyak.targynev != "osztályfőnöki"
            GROUP BY tanar.pedagogus_id
            ORDER BY ${req.params.orderby} ASC`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /teachers/${req.params.orderby}/ at ` + new Date().toLocaleString());
    });
});

server.get("/teachers/:orderby/desc", (req, res) => {
    let q = `SELECT tanar.pedagogus_id, tanar.nev, GROUP_CONCAT(tanitott_targyak.targynev SEPARATOR ", ") AS targyak
            FROM tanar, tanitott_targyak
            WHERE tanar.pedagogus_id = tanitott_targyak.pedagogus_id
            AND tanitott_targyak.targynev != "osztályfőnöki"
            GROUP BY tanar.pedagogus_id
            ORDER BY ${req.params.orderby} DESC`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /teachers/${req.params.orderby}/desc at ` + new Date().toLocaleString());
    });
});

// Nontrivial
server.get("/avgsubjects", (_req, res) => {
    let q = `SELECT MIN(hany_targyat) AS min, MAX(hany_targyat) AS max, AVG(hany_targyat) AS atlag
            FROM (
                SELECT tanar.nev, COUNT(tanitott_targyak.pedagogus_id) AS hany_targyat
                FROM tanar, tanitott_targyak
                WHERE tanitott_targyak.pedagogus_id = tanar.pedagogus_id
                GROUP BY tanar.nev
            ) AS targyszam`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /avgsubjects at " + new Date().toLocaleString());
    });
});

// Nontrivial
server.get("/avglessons", (_req, res) => {
    let q = `SELECT MIN(hany_orat) AS min, MAX(hany_orat) AS max, AVG(hany_orat) AS atlag
            FROM (
                SELECT tanar.nev, COUNT(*) AS hany_orat
                FROM tanar, ora
                WHERE tanar.pedagogus_id = ora.pedagogus_id
                GROUP BY tanar.nev
            ) AS oraszam`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /avglessons at " + new Date().toLocaleString());
    });
});


// Nontrivial
server.get("/howmanylessons", (_req, res) => {
    let q = `SELECT tanar.nev, COUNT(*) AS hany_orat
            FROM tanar, ora
            WHERE tanar.pedagogus_id = ora.pedagogus_id
            GROUP BY tanar.nev
            ORDER BY tanar.nev`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /howmanylessons at " + new Date().toLocaleString());
    });
});

// Nontrivial with subquery
server.get("/topsubjects", (_req, res) => {
    let q = `SELECT tantargy.nev, GROUP_CONCAT(tanar.nev SEPARATOR ', ') AS tanarok
            FROM tanar, tantargy, tanitott_targyak
            WHERE tanar.pedagogus_id = tanitott_targyak.pedagogus_id
            AND tantargy.nev = tanitott_targyak.targynev
            AND tantargy.nev IN (SELECT * FROM (SELECT tantargy.nev
                                FROM tantargy, ora
                                WHERE tantargy.nev = ora.nev
                                GROUP BY tantargy.nev
                                ORDER BY COUNT(*) DESC
                                LIMIT 3) AS nev)
            GROUP BY tantargy.nev`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /topsubjects at " + new Date().toLocaleString());
    });
});

// Classes
server.get("/classes", (_req, res) => {
    let q = `SELECT osztaly.osztaly_id, osztaly.kezdes_eve, osztaly.vegzes_eve, osztaly.letszam, tanar.nev, osztaly.teremszam
            FROM osztaly, tanar
            WHERE osztaly.pedagogus_id = tanar.pedagogus_id`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /classes at " + new Date().toLocaleString());
    });
});

server.get("/classes/:orderby", (req, res) => {
    let q = `SELECT osztaly.osztaly_id, osztaly.kezdes_eve, osztaly.vegzes_eve, osztaly.letszam, tanar.nev, osztaly.teremszam
            FROM osztaly, tanar
            WHERE osztaly.pedagogus_id = tanar.pedagogus_id
            ORDER BY ${req.params.orderby} ASC`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /classes/${req.params.orderby}/ at ` + new Date().toLocaleString());
    });
});

server.get("/classes/:orderby/desc", (req, res) => {
    let q = `SELECT osztaly.osztaly_id, osztaly.kezdes_eve, osztaly.vegzes_eve, osztaly.letszam, tanar.nev, osztaly.teremszam
            FROM osztaly, tanar
            WHERE osztaly.pedagogus_id = tanar.pedagogus_id
            ORDER BY ${req.params.orderby} DESC`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /classes/${req.params.orderby}/desc at ` + new Date().toLocaleString());
    });
});

// Schedules
server.get("/lessons", (req, res) => {
    let q = `SELECT ora.teremszam, ora.nap, ora.ora, ora.osztaly_id, tanar.nev AS tanar, ora.nev
            FROM ora, tanar
            WHERE ora.pedagogus_id = tanar.pedagogus_id`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /lessons at " + new Date().toLocaleString());
    });
});

server.get("/schedule/:classid", (req, res) => {
    let q = `SELECT ora.ora, ora.nap, ora.nev, ora.teremszam, tanar.nev AS tanar
            FROM ora, tanar
            WHERE ora.osztaly_id = '${req.params.classid}'
            AND ora.pedagogus_id = tanar.pedagogus_id`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /schedule/${req.params.classid} at ` + new Date().toLocaleString());
    });
});

server.get("/classlist", (_req, res) => {
    let q = `SELECT osztaly.osztaly_id, tanar.nev AS tanar
            FROM osztaly, tanar
            WHERE osztaly.pedagogus_id = tanar.pedagogus_id
            GROUP BY osztaly.osztaly_id`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log("GET /classlist at " + new Date().toLocaleString());
    });
});

// Subjects
server.get("/subjects", (_req, res) => {
    let q = `SELECT * FROM tantargy ORDER BY tantargy.nev ASC`;

    db.query(q, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        console.log(`GET /subjects at ` + new Date().toLocaleString());
    });
});

// Post requests

// Subjects
server.post("/add/subject", jsonParser, (req, res) => {
    let q = `INSERT INTO tantargy
            VALUES ('${req.body.nev}');`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /add/subject at ` + new Date().toLocaleString());
        }
    });
});

server.post("/modify/subject", jsonParser, (req, res) => {
    let q = `UPDATE tantargy
            SET nev = '${req.body.new_nev}'
            WHERE nev = '${req.body.old_nev}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /modify/subject at ` + new Date().toLocaleString());
        }
    });
});

server.post("/delete/subject", jsonParser, (req, res) => {
    let q = `DELETE FROM tantargy
            WHERE nev = '${req.body.nev}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /delete/subject at ` + new Date().toLocaleString());
        }
    });
});

// Classrooms
server.post("/add/classroom", jsonParser, (req, res) => {
    let q = `INSERT INTO terem
            VALUES ('${req.body.teremszam}', ${req.body.kapacitas}, ${req.body.gepterem_e});`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /add/classroom at ` + new Date().toLocaleString());
        }
    });
});

server.post("/modify/classroom", jsonParser, (req, res) => {
    let q = `UPDATE terem
            SET teremszam = '${req.body.new_teremszam}', kapacitas = ${req.body.new_kapacitas}, gepterem_e = ${req.body.new_gepterem_e} 
            WHERE teremszam = '${req.body.old_teremszam}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /modify/classroom at ` + new Date().toLocaleString());
        }
    });
});

server.post("/delete/classroom", jsonParser, (req, res) => {
    let q = `DELETE FROM terem
            WHERE teremszam = '${req.body.teremszam}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /delete/classroom at ` + new Date().toLocaleString());
        }
    });
});

// Teachers
server.post("/add/teacher", jsonParser, (req, res) => {
    let q = `INSERT INTO tanar VALUES
            ('${req.body.pedagogus_id}', '${req.body.nev}');
            
            INSERT INTO tanitott_targyak VALUES 
            ('${req.body.pedagogus_id}', '${req.body.targynev1}'),
            ('${req.body.pedagogus_id}', '${req.body.targynev2}');`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /add/teacher at ` + new Date().toLocaleString());
        }
    });
});

server.post("/modify/teacher", jsonParser, (req, res) => {
    let q = `UPDATE tanar
            SET pedagogus_id = '${req.body.new_pedagogus_id}', nev = '${req.body.new_targynev}' 
            WHERE pedagogus_id = '${req.body.old_pedagogus_id}';
            
            UPDATE tanitott_targyak
            SET pedagogus_id = '${req.body.new_pedagogus_id}', targynev = '${req.body.new_targynev1}' 
            WHERE pedagogus_id = '${req.body.old_pedagogus_id}'
            AND targynenev = '${req.body.old_targynev1}';
            
            UPDATE tanitott_targyak
            SET pedagogus_id = '${req.body.new_pedagogus_id}', 'targynev = ${req.body.new_targynev2}' 
            WHERE pedagogus_id = '${req.body.old_pedagogus_id}'
            AND targynenev = '${req.body.old_targynev2}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /modify/teacher at ` + new Date().toLocaleString());
        }
    });
});

server.post("/delete/teacher", jsonParser, (req, res) => {
    let q = `DELETE FROM tanar
            WHERE pedagogus_id = '${req.body.pedagogus_id}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /delete/teacher at ` + new Date().toLocaleString());
        }
    });
});

// Classes
server.post("/add/class", jsonParser, (req, res) => {
    let q = `INSERT INTO osztaly
            VALUES ('${req.body.osztaly_id}', ${req.body.kezdes_eve}, ${req.body.vegzes_eve},
            ${req.body.letszam}, '${req.body.pedagogus_id}', '${req.body.teremszam}');`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /add/class at ` + new Date().toLocaleString());
        }
    });
});

server.post("/modify/class", jsonParser, (req, res) => {
    let q = `UPDATE osztaly
            SET osztaly_id = '${req.body.new_osztaly_id}', kezdes_eve = ${req.body.new_kezdes_eve}, vegzes_eve = ${req.body.new_vegzes_eve}, 
            letszam = ${req.body.new_letszam}, pedagogus_id = '${req.body.new_pedagogus_id}', teremszam = '${req.body.new_teremszam}' 
            WHERE osztaly_id='${req.body.old_osztaly_id}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /modify/class at ` + new Date().toLocaleString());
        }
    });
});

server.post("/delete/class", jsonParser, (req, res) => {
    let q = `DELETE FROM osztaly
            WHERE osztaly_id = '${req.body.osztaly_id}';`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /delete/class at ` + new Date().toLocaleString());
        }
    });
});

// Lessons
server.post("/add/lesson", jsonParser, (req, res) => {
    let q = `INSERT INTO ora
            VALUES ('${req.body.teremszam}', '${req.body.nap}',  ${req.body.ora},
            '${req.body.osztaly_id}', '${req.body.pedagogus_id}', '${req.body.nev}');`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /add/lesson at ` + new Date().toLocaleString());
        }
    });
});

server.post("/delete/lesson", jsonParser, (req, res) => {
    let q = `DELETE FROM ora
            WHERE teremszam = '${req.body.teremszam}'
            AND nap = '${req.body.nap}'
            AND ora = ${req.body.ora};`;

    db.query(q, (err, result) => {
        if (err) {
            res.status(418).send();
        } else {
            res.status(200).send();
            console.log(`POST /delete/lesson at ` + new Date().toLocaleString());
        }
    });
});