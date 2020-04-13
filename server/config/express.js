const path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    dbRouter = require('../routes/dbRouter.js'),
    cors = require('cors'),
    {auth0} = require('./config'),
    request = require('request');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({
        extended: true
      }));

    // body parsing middleware
    app.use(bodyParser.json());

    // cors
    app.use(cors());
    //access codes for authentication
    
    app.get('/auth',(req,res) => {
        res.send(auth0);
    });

    var options = { method: 'POST',
    url: 'https://wadboy.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"UlL6zTercIkWOWQkeeSTX1V6u667hhqQ","client_secret":"CB3MtgXf-0YyxmZPzUSUgxIYGqWr4GeX2ZcAEZOzb8fwWta4ezfjuYWRjMm3I82N","audience":"https://wadboy.auth0.com/api/v2/","grant_type":"client_credentials"}' };
    var access;
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        access = body;
    });
     app.get('/auth/access',(req,res)=>{
         res.send(access);
     })
    // add a router
    app.use('/api/db/', dbRouter);
    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

