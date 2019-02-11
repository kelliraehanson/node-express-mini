// implement your API here

const express = require('express')
// this is the same as import express from 'express'

const db = require('./data/db.js');

const server = express();

// middleware
server.use(express.json());
