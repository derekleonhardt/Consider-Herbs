const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dbRouter = require('./routes/dbRouter.js');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/api/db/', dbRouter);

app.listen(5000, () => console.log(`App now listening on port 5000`));
