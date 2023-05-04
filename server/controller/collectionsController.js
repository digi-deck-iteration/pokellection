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
  try {
    const { ssidCookie } = req.cookies.ssid;
    const deck = [];
    //for given user's ssid, return every deck_id for user in the decks table
    str = 'SELECT ';

    db.query;

    res.locals.deck = deck;
    return next();
  } catch (err) {
    const errorObj = {
      log: 'Could not get Deck',
      status: 400,
      message: 'Uh oh! Could not get deck',
    };
    return next(errorObj);
  }
};

module.exports = collectionsController;
