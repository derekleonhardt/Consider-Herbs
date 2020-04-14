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

    // var options = { method: 'POST',
    // url: 'https://wadboy.auth0.com/oauth/token',
    // headers: { 'content-type': 'application/json' },
    // body: `{"client_id":"${process.env.REACT_APP_AUTH0_CLIENT_ID_M}",
    // "client_secret:"${process.env.REACT_APP_CLIENT_SECRET_M}",
    // audience:"https://wadboy.auth0.com/api/v2/",grant_type:"client_credentials"}` };

    
    var access;
    var options = {
        method: 'POST',
        url: 'https://wadboy.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        form: {
          grant_type: 'client_credentials',
          client_id: `${auth0.clientId_m}`,
          client_secret: `${auth0.clientSecret_m}`,
          audience: 'https://wadboy.auth0.com/api/v2/'
        }
      };
      
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

