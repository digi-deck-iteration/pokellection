const db = require('../models/pokemon_model');

module.exports = {
  fetchPokimon: (req, res, next) => {
    fetch('https://api.pokemontcg.io/v2/cards/xy1-1')
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        res.locals.data = resp;
        next();
      })
      .catch((err) => next({ log: 'error in fetch pokimon' }));
  },

  parsePokimon: (req, res, next) => {
    const {
      data: {
        id,
        name,
        tcgplayer: { url, updatedAt, prices },
        images: { large },
      },
    } = res.locals.data;

    let pricesToJSon = JSON.stringify(prices);

    let str =
      'INSERT INTO pokemon (id_in_set, tcgplayer_url, tcgplayer_updated_at, tcgplayer_prices, name, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

    db.query(str, [id, url, updatedAt, pricesToJSon, name, large])
      .then((data1) => (res.locals.data1 = data1))
      .catch((err) => console.log('ERROR:', err));

    next();
  },

  uploadPokimon: (req, res, next) => {
    next();
  },
};
