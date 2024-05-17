// import express from 'express';
// import { PORT } from './config.js';
// const PORT = require('./config.js');
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const students = require('./students.json')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// const students = {
//     id: 1,
//     name: "Srikar",
//     branch: "CSE"
// }

app.get('/', (req, res) => {
    res.status(200).send("Fetched Successfully");
});

app.get('/api/students/', (req, res) => {
    const index = parseInt(req.params.id);
    const student = students.students.find(std => parseInt(std.id) === index)
    console.log(index)
    console.log(student)
    if (student) {
        res.status(200).json(student);
    }
    else {
        res.send("No data")
    }
});

const verifyToken = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'srikar-key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    })
}

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Srikar'
    };

    jwt.sign({ user }, 'srikar-key', (err, token) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" })
        }
        res.json({ token })
    })
})

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "Protected Route", user: req.user })
})

app.post('/api/students', (req, res) => {
    const requestData = students.students.push(req.body);
    console.log(requestData);
    res.json(students.students);
});

app.listen(5000, () => {
    console.log(`Server is running successfully at 5000`);
}); 