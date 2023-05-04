const fetch = require('node-fetch');
const db = require('../models/postgreSQLdb');
const singleDBEntry = require('../models/pokemon_model');

const collectionsController = {};

//inserting, joining?
collectionsController.addDeck = (req, res, next) => {
  try {
    const { name } = req.body;
    const { ssid } = req.cookies;

    const str =
      'INSERT INTO collections (user_id, deck_id, name) VALUES ($1, $2, $3)';
    singleDBEntry
      .query(str, [ssid, res.locals.today, name])
      .then((resp) => {
        console.log(resp);
        return next();
      })
      .catch((err) => {
        next({ log: err });
      });
  } catch (err) {
    const errorObj = {
      log: 'Search results not fetched properly',
      status: 400,
      message: 'Uh oh! Could not select results',
    };
    return next(errorObj);
  }
};

collectionsController.addCardsToDeck = (req, res, next) => {
  const { array } = req.body;
  const { name } = req.body;
  const today = Date.now();
  res.locals.today = today;

  const queryArray = array.map((pokeId) => {
    return [today, pokeId];
  });
  console.log(queryArray);
  const str = 'INSERT INTO decks (deck_id, pokemon_id) VALUES ($1, $2)';

  db.bulkQuery(str, queryArray)
    .then((resp) => {
      console.log('RESPONSE:', resp);
      next();
    })
    .catch((err) => next({ log: err }));
};

//Select from the table
collectionsController.getDeck = (req, res, next) => {
    try{
        console.log("Hit getDeck middleware")
        const {ssidCookie} = req.cookies.ssid
        
        const text = "SELECT * FROM collections where user_id=$1"
        // const values = [`${ssidCookie}`];
        const values = [`6452de37ddb7a88560079c9a`];
        console.log("About to query DB for decks");
        db.query(text, values)
        .then((data) => {
            console.log(data.rows);
            res.locals.data = data.rows;
            return next();
        })
        .catch((err) => next(err));
    } catch(err) {
        const errorObj = {
          log: 'Could not get Deck',
          status: 400,
          message: 'Uh oh! Could not get deck',
        };
        return next(errorObj);
    }
}

collectionsController.getCards = (req, res, next) => {
    try{
        console.log("Hit getCards middleware")
        const deckId = req.body.deckId;
        const text = "SELECT * FROM pokemon p JOIN decks d ON d.pokemon_id=p.id_in_set WHERE d.deck_id=$1";
        // const values = [deckId];
        const values = ['1683231813771'];
        db.query(text, values)
        .then((data) => {
            console.log(data.rows);
            res.locals.data = data.rows;
            return next();
        })
        .catch((err) => next(err));
    } catch(err) {
        const errorObj = {
          log: 'Could not get cards',
          status: 400,
          message: 'Uh oh! Could not get cards',
        };
        return next(errorObj);
    }
}

module.exports = collectionsController;
