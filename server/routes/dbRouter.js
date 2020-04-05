const db = require('../controllers/dbController.js');
const express = require('express'); 
const dbRouter = express.Router();
// recipe
dbRouter.get('/recipe/name/:name', db.readRecipe);
dbRouter.get('/recipe/id/:id', db.readRecipeByID);
dbRouter.get('/recipe/', db.listRecipe);
dbRouter.get('/recipe/search/:query', db.searchRecipe);
dbRouter.post('/recipe/insert',db.insertRecipe);
dbRouter.post('/recipe/update',db.updateRecipe);
dbRouter.delete('/recipe/delete/:id', db.deleteRecipe);


// ingredients
dbRouter.post('/ingredients/add', db.addIngredient);
dbRouter.delete('ingredients/delete/:id/:name', db.deleteIngredient);

// glossary
dbRouter.get('/glossary/name/:name', db.readGlossary);
dbRouter.get('/glossary/', db.listGlossary);
dbRouter.get('/glossary/search/:query', db.searchGlossary);
dbRouter.post('/glossary/insert', db.insertGlossary);
dbRouter.post('/glossary/update', db.updateGlossary);
dbRouter.delete('/glossary/delete/:name', db.deleteGlossary);
dbRouter.delete('/glossary/delete/def/:def', db.deleteGlossaryDef);

module.exports = dbRouter;