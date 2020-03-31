const express = require('express');
const https = require('https');
const fs = require('fs');
const { auth } = require("express-openid-connect");
const config = require("./config/config.js");
var request = require('request');
// const sqlite3 = require('sqlite3').verbose();
//const dbRouter = require('./routes/dbRouter.js')

// const key = fs.readFileSync('./server/localhost-key.pem');
// const cert = fs.readFileSync('./server/localhost.pem');

const app = express();



(app).listen(5000, () => {
    console.log('Listening on https://localhost:5000');
});