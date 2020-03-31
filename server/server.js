const express = require('./config/express.js');

const port = process.env.PORT || 5000;
const app = express.init();

app.listen(port, () => console.log(`App now listening on port 5000`));
