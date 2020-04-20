const db = require('../controllers/dbController.js');
const express = require('express'); 
const dbRouter = express.Router();
// recipe
dbRouter.get('/recipe/name/:name', db.readRecipe);
dbRouter.get('/recipe/id/:id', db.readRecipeByID);
dbRouter.get('/recipe/', db.listRecipe);
dbRouter.get('/recipe/extended/', db.listRecipeWithIngredients);
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
dbRouter.get('/post/:id', db.readPost);
dbRouter.post('/post/write/', db.writePost);        // post body json{title, content}
dbRouter.post('/post/edit/:id', db.updatePost);     // post body json{title, content}
dbRouter.delete('/post/delete/:id', db.deletePost);

// reply
dbRouter.get('/post/:id/reply/', db.listReply);
dbRouter.post('/post/:id/reply/write', db.writeReply);  // post body json{title, content}
dbRouter.post('/post/reply/edit', db.updateReply);  // post body json{id}
dbRouter.post('/post/reply/delete', db.deleteReply);  // post body json{id}

// booking
dbRouter.get('/booking/', db.listBooking);
dbRouter.post('/booking/commit/', db.commitBooking);
dbRouter.get('/booking/admin/', db.adminListBooking);
dbRouter.post('/booking/admin/confirm', db.confirmBooking);
dbRouter.post('/booking/admin/insert', db.adminInsertBooking);

//content - link
dbRouter.get('/links/', db.listLinks);
dbRouter.get('/links/:id', db.readLink);
dbRouter.get('/links/page/:page', db.readLinkPage);
dbRouter.post('/links/insert/', db.insertLink);
dbRouter.delete('/links/delete/:id', db.deleteLink);
dbRouter.patch('/links/update/:id', db.updateLink);

//content - image
dbRouter.get('/images/', db.listImages);
dbRouter.get('/images/:id', db.readImage);
dbRouter.get('/images/page/:page', db.readImagePage);
dbRouter.post('/images/insert/', db.insertImage);
dbRouter.delete('/images/delete/:id', db.deleteImage);
dbRouter.patch('/images/update/:id', db.updateImage);

//content - text
dbRouter.get('/text/', db.listText);
dbRouter.get('/text/:id', db.readText);
dbRouter.get('/text/page/:page', db.readTextPage);
dbRouter.post('/text/insert/', db.insertText);
dbRouter.delete('/text/delete/:id', db.deleteText);
dbRouter.patch('/text/update/:id', db.updateText);

//content - product
dbRouter.get('/products/', db.listProduct);
dbRouter.get('/products/:id', db.readProduct);
dbRouter.get('/products/page/:page', db.readProductPage);
dbRouter.post('/products/insert/', db.insertProduct);
dbRouter.delete('/products/delete/:id', db.deleteProduct);
dbRouter.patch('/products/update/:id', db.updateProduct);

//subscription
dbRouter.get('/subscription/', db.listSubscription);

module.exports = dbRouter;
