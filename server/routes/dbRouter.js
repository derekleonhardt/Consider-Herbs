const db = require('../controllers/dbController.js'),
      express = require('express'), 
      dbRouter = express.Router()

dbRouter.get('/recipe/:name', db.readRecipe)
dbRouter.get('/recipe/', db.listRecipe)
  
module.exports = router;