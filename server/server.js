const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dbRouter = require('./routes/dbRouter.js');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/api/db/', dbRouter);

app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  res.sendFile(url);
});

app.listen(process.env.PORT || 5000, () => console.log(`App now listening on port 5000`));
