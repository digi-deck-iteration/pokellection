const fetch = require('node-fetch');
const db = require('../models/pokemon_model');

const collectionsController = {};

//inserting, joining?
collectionsController.addDeck = (req, res, next) => {
    
    try{
        const {ids} = req.body;
        const {userId} = req.body;

        for (let i = 0; i < ids.length; i++){
            str = "INSERT INTO 'deck table' VALUES ('${ids[i]}')";

        }


        res.locals.newDeck = data;
        return next();
    }
    catch(err) {
        const errorObj = {
          log: 'Search results not fetched properly',
          status: 400,
          message: 'Uh oh! Could not select results',
        };
        return next(errorObj);
    }
}

//Select from the table
collectionsController.getDeck = (req, res, next) => {
    try{
        const {ssidCookie} = req.cookies.ssid
        const deck = [];
        //for given user's ssid, return every deck_id for user in the decks table
        //
        res.locals.deck = deck;
        return next();
    } catch(err) {
        const errorObj = {
          log: 'Could not get Deck',
          status: 400,
          message: 'Uh oh! Could not get deck',
        };
        return next(errorObj);
    }
}

module.exports = collectionsController;