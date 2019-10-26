const express = require('express');

const server = express();

server.listen(3000, () => {
    console.log("Orarend server is running on port 3000")
});

// CORS enable (from Stackoverflow)
server.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get("/lessons", (req, res) => {
    res.status(200).send(lessons);
});

const lessons = [
    {
        startTime: "10:00",
        subjectName: "Maths"
    },
    {
        startTime: "12:00",
        subjectName: "Literature"
    }
]