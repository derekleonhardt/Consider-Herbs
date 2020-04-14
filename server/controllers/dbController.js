const sqlite3 = require('sqlite3').verbose();
const dbPath = './server/db/considerHerbDB.db';
const dbPathPostReply = './server/db/PostReplyDB.db';
const dbPathBooking = './server/db/bookingDB.db';
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
const searchRecipeByBody = async (req, res) => {
  const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
      });
      db.serialize(() => {
          db.all(`SELECT * FROM recipe where Bodypart=? COLLATE NOCASE`, [req.params.body], (err, row) => {
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

const updateRecipe = async (req, res) => {
  const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`update recipe set Recname=?, Ailment=?, BodyPart=?, Description=? where Id=?`, [req.body.name, req.body.ailment, req.body.bodyPart, req.body.description, req.body.Id], function(err) {
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
        db.get(`SELECT * FROM glossary where Title=? COLLATE NOCASE`, [req.params.name], (err, row) => {
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
const listGlossary = async (req, res) => {
  const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
      });
      db.serialize(() => {
          db.all(`SELECT * FROM glossary`, (err, row) => {
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
const searchGlossary = async (req, res) => {
  const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
      });
      db.serialize(() => {
          db.all(`SELECT * FROM glossary where Title like ?`, ["%"+req.params.query+"%"], (err, row) => {
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

    db.run(`INSERT INTO glossary(Title, Definition, Usage) VALUES(?,?,?)`, [req.body.title, req.body.definition, req.body.usage], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully inserted data."});
    });
    db.close();
};

const updateGlossary = async (req, res) => {
  const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`update glossary set Definition =?, Usage=? where Title=?`, [req.body.definition, req.body.usage, req.body.name], function(err) {
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
const deleteGlossaryDef = async (req, res) => {
  const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`delete from glossary where Definition = ?`, [req.params.def], function(err) {
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

const listPost = async (req, res) => {
  const db = new sqlite3.Database(dbPathPostReply, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
    });
    db.serialize(() => {
        db.all(`SELECT * FROM post`, (err, row) => {
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
}

const readPost = async (req, res) => {
  const db = new sqlite3.Database(dbPathPostReply, (err) => {
  if (err) {
      res.json({error:"error while connecting database.", "message":err});
  }
  });

  db.serialize(() => {
      db.get(`SELECT * FROM post where Id=?`, [req.params.id], (err, row) => {
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

const writePost = async (req, res) => {
  const db = new sqlite3.Database(dbPathPostReply, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`INSERT INTO post(Title, content, Date) VALUES(?,?,?)`, [req.body.title, req.body.content, new Date()], function(err) {
    if (err) {
      res.json({error:"error while processing data.", "message":err});
      return;
    }
    res.json({success:"successfully inserted data."});
  });
  db.close();
};

const updatePost = async (req, res) => {
  const db = new sqlite3.Database(dbPathPostReply, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`update post set Title =?, content=?, Date=? where Id=?`, [req.body.title, req.body.content, new Date(), req.params.id], function(err) {
    if (err) {
      res.json({error:"error while processing data.", "message":err});
      return;
    }
    res.json({success:"successfully inserted data."});
  });
  db.close();
};

const deletePost = async (req, res) => {
    const db = new sqlite3.Database(dbPathPostReply, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`delete from post where Id = ?`, [req.params.id], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully deleted data."});
    });
    db.close();
};

const listReply = async (req, res) => {
  const db = new sqlite3.Database(dbPathPostReply, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
    });
    db.serialize(() => {
        db.all(`SELECT * FROM reply where postId=?`,[req.params.id], (err, row) => {
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
}

const writeReply = async (req, res) => {
  const db = new sqlite3.Database(dbPathPostReply, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`INSERT INTO reply(postId, Title, content, Date) VALUES(?,?,?,?)`, [req.params.id, req.body.title, req.body.content, new Date()], function(err) {
    if (err) {
      res.json({error:"error while processing data.", "message":err});
      return;
    }
    res.json({success:"successfully inserted data."});
  });
  db.close();
};

const updateReply = async (req, res) => {
  const db = new sqlite3.Database(dbPathPostReply, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`update reply set Title =?, content=?, Date=? where Id=?`, [req.body.title, req.body.content, new Date(), req.body.id], function(err) {
    if (err) {
      res.json({error:"error while processing data.", "message":err});
      return;
    }
    res.json({success:"successfully inserted data."});
  });
  db.close();
};

const deleteReply = async (req, res) => {
    const db = new sqlite3.Database(dbPathPostReply, (err) => {
        if (err) {
            res.json({error:"error while connecting database.", "message":err});
        }
    });

    db.run(`delete from reply where Id = ?`, [req.body.id], function(err) {
      if (err) {
        res.json({error:"error while processing data.", "message":err});
        return;
      }
      res.json({success:"successfully deleted data."});
    });
    db.close();
};

const listBooking = async (req, res) => {
  const db = new sqlite3.Database(dbPathBooking, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
    });
    db.serialize(() => {
        db.all(`SELECT * FROM booking where visible=1`, (err, row) => {
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
}

const adminListBooking = async (req, res) => {
  const db = new sqlite3.Database(dbPathBooking, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
    });
    db.serialize(() => {
        db.all(`SELECT * FROM booking`, (err, row) => {
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
}

const commitBooking = async (req, res) => {
    const db = new sqlite3.Database(dbPathBooking, (err) => {
      if (err) {
          res.json({error:"error while connecting database.", "message":err});
      }
  });

  db.run(`INSERT INTO booking(Token, EventTitle, Comment, Date, Visible) VALUES(?,?,?,?,?)`, [req.body.token, req.body.title, req.body.comment, req.body.date, 0], function(err) {
    if (err) {
      res.json({error:"error while processing data.", "message":err});
      return;
    }
    console.log(new Date(req.body.date));
    res.json({success:"successfully inserted data."});
  });
  db.close();
}

const checkBooking = async (req, res) => {

}

const confirmBooking = async (req, res) => {
  const db = new sqlite3.Database(dbPathBooking, (err) => {
    if (err) {
        res.json({error:"error while connecting database.", "message":err});
    }
});

db.run(`update booking set Visible=1 where Id=?`, [req.body.id], function(err) {
  if (err) {
    res.json({error:"error while processing data.", "message":err});
    return;
  }
  res.json({success:"successfully inserted data."});
});
db.close(); 
}

module.exports = {
  readRecipe, 
  readRecipeByID, 
  listRecipe, 
  searchRecipe, 
  insertRecipe, 
  updateRecipe, 
  deleteRecipe, 
  searchRecipeByBody, 
  listGlossary, 
  readGlossary, 
  updateGlossary, 
  insertGlossary, 
  searchGlossary, 
  deleteGlossary, 
  deleteGlossaryDef, 
  addIngredient, 
  deleteIngredient,
  listPost,
  readPost,
  writePost,
  updatePost,
  deletePost,
  listReply,
  writeReply,
  updateReply,
  deleteReply,
  listBooking,
  adminListBooking,
  commitBooking,
  checkBooking,
  confirmBooking
};