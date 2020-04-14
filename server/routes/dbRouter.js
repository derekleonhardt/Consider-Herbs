const db = require('../controllers/dbController.js');
const express = require('express'); 
const dbRouter = express.Router();
// recipe
dbRouter.get('/recipe/name/:name', db.readRecipe);
dbRouter.get('/recipe/id/:id', db.readRecipeByID);
dbRouter.get('/recipe/', db.listRecipe);
dbRouter.get('/recipe/body/:body', db.searchRecipeByBody);
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

// post
dbRouter.get('/post/', db.listPost);
dbRouter.get('/post/read/:id', db.readPost);
dbRouter.post('/post/write/', db.writePost);        // post body json{title, content}
dbRouter.post('/post/edit/:id', db.updatePost);     // post body json{title, content}
dbRouter.delete('/post/delete/:id', db.deletePost);

// reply
dbRouter.get('/post/:id/reply/', db.listReply);
dbRouter.post('/post/:id/reply/write', db.writeReply);  // post body json{title, content}
dbRouter.post('/post/reply/edit', db.updateReply);  // post body json{id}
dbRouter.post('/post/reply/delete', db.deleteReply);  // post body json{id}
module.exports = dbRouter;

// booking
dbRouter.get('/booking/', db.listBooking);
dbRouter.post('/booking/commit/', db.commitBooking);
dbRouter.get('/booking/admin/', db.adminListBooking);
dbRouter.post('/booking/admin/confirm', db.confirmBooking);

//content - link
dbRouter.get('/content/links/', db.listLinks);
dbRouter.post('/content/links/insert/', db.insertLink);