const sqlite3 = require('sqlite3').verbose();
const dbPath = './server/db/considerHerbDB.db';
const readRecipe = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
    });
    db.serialize(() => {
        db.all(`SELECT * FROM ingredients inner join recipe on ingredients.Id = recipe.Id where RecName = ?`, [req.params.name], (err, row) => {
          if (err) {
            res.json({error:"error while processing data.", "message":err});
          }
          if(row){
            var recData = {data: {
                "Id": row[0].Id,
                "Ingredients":[],
                "RecName": row[0].RecName,
                "Ailment": row[0].Ailment,
                "BodyPart": row[0].BodyPart,
                "Description": row[0].Description
            }};
            row.map((data)=>{
                recData.data.Ingredients.push({
                    "IngName": data.IngName,
                    "Amounut": data.Amounut,
                    "Units": data.Units});
            });
            res.json(recData);
          }
          else
            res.json({data:{}})
        });e
      });
       
    db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};
const readRecipeByID = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
    });
    db.serialize(() => {
        db.all(`SELECT * FROM ingredients inner join recipe on ingredients.Id = recipe.Id where recipe.Id = ?`, [req.params.id], (err, row) => {
          if (err) {
            res.json({error:"error while processing data.", "message":err});
          }
          if(row){
            var recData = {data: {
                "Id": row[0].Id,
                "Ingredients":[],
                "RecName": row[0].RecName,
                "Ailment": row[0].Ailment,
                "BodyPart": row[0].BodyPart,
                "Description": row[0].Description
            }};
            row.map((data)=>{
                recData.data.Ingredients.push({
                    "IngName": data.IngName,
                    "Amounut": data.Amounut,
                    "Units": data.Units});
            });
            res.json(recData);
          }
          else
            res.json({data:{}})
        });
      });
       
    db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};
const listRecipe = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
        });
        db.serialize(() => {
            db.all(`SELECT * FROM recipe`, (err, row) => {
              if (err) {
                res.json({error:"error while processing data.", "message":err});
              }
                res.json({data: row});
            });
          });
           
        db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Close the database connection.');
        });
};
const searchRecipe = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
        });
        db.serialize(() => {
            db.all(`SELECT * FROM recipe where RecName like ?`, ["%"+req.params.query+"%"], (err, row) => {
              if (err) {
                res.json({error:"error while processing data.", "message":err});
              }
                res.json({data: row});
            });
          });
           
        db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Close the database connection.');
        });
};
const insertRecipe = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`INSERT INTO recipe(RecName, Ailment, BodyPart, Description) VALUES(?,?,?,?)`, [req.body.name, req.body.ailment, req.body.bodyPart, req.body.description], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully inserted data."});
    });
    db.close();
};

const deleteRecipe = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`delete from recipe where Id = ?`, [req.params.id], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully deleted data."});
    });
    db.close();
};

const readGlossary = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
    });
    db.serialize(() => {
        db.get(`SELECT * FROM glossary where Title=?`, [req.params.name], (err, row) => {
          if (err) {
            res.json({error:"error while processing data.", "message":err});
          }
            res.json({data: row});
        });
      });
       
    db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};

const insertGlossary = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`INSERT INTO glossary(Title, Definition, Usage) VALUES(?,?,?)`, [req.body.name, req.body.definition, req.body.usage], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully inserted data."});
    });
    db.close();
};

const deleteGlossary = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`delete from glossary where Title = ?`, [req.params.name], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully deleted data."});
    });
    db.close();
};

const addIngredient = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`INSERT INTO ingredients(Id, Ingname, Amounut, Units) VALUES(?,?,?, ?)`, [req.body.recipeId, req.body.name, req.body.amount, req.body.units], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully inserted data."});
    });
    db.close();
};

const deleteIngredient = async (req, res) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`delete from ingredients where Id = ? and IngName = ?`, [req.params.recipeId, req.params.name], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully deleted data."});
    });
    db.close();
};

module.exports = {readRecipe, readRecipeByID, listRecipe, searchRecipe, insertRecipe, deleteRecipe, readGlossary, insertGlossary, deleteGlossary, addIngredient, deleteIngredient};