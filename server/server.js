//const path = require('path');
const express = require('./config/express.js');
//const bodyParser = require('body-parser');
//const dbRouter = require('./routes/dbRouter.js');

const app = express.init();

app.listen(process.env.PORT || 5000, () => console.log(`App now listening on port 5000`));