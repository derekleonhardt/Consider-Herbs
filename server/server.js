const express = require('express');
const https = require('https');
const fs = require('fs');
const { auth } = require("express-openid-connect");
const config = require("./config/config.js");
const sqlite3 = require('sqlite3').verbose();
//const dbRouter = require('./routes/dbRouter.js')

const key = fs.readFileSync('./server/localhost-key.pem');
const cert = fs.readFileSync('./server/localhost.pem');
const app = express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config.auth0));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.isAuthenticated() ? "<button>logout</button>" : "<button>login</button>");
});

app.get("/check", (req, res) => {
  res.send(req.isAuthenticated() ? "true" : "false");
});

<<<<<<< Updated upstream
app.get("/", (req,res) =>{

});

https.createServer({key, cert}, app).listen('3000', () => {
    console.log('Listening on https://localhost:3000');
=======
//app.use('/api/data/', dbRouter);

https.createServer({key, cert}, app).listen('5000', () => {
    console.log('Listening on https://localhost:5000');
>>>>>>> Stashed changes
});