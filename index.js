// implement your API here

const express = require('express') // this is the same as import express from 'express'
const db = require('./data/db.js');
const server = express();
const port = 4000;
server.use(express.json()); // middleware

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users)
})
.catch(() => {
    res.status(500).json({ error: "error"})
})
})


server.listen(port, () => {
    console.log('server is running', port)
});