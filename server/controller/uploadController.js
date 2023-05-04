const db = require('../models/pokemon_model');
const pokemonAPI = require('pokemontcgsdk');
const { Pool } = require('pg');
pokemonAPI.configure({ apiKey: process.env.POKI_API_KEY });

const pool = new Pool({
  connectionString: process.env.ELEPHANTSQL_SERVER,
});

module.exports = {
  fetchPokimon: (req, res, next) => {
    fetch('https://api.pokemontcg.io/v2/cards/?pageSize=250&page=20')
      // .where({ pageSize: 250, page: 1 })
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        res.locals.data = resp.data;
        next();
      })
      .catch((err) => next({ log: 'error in fetch pokimon' }));
  },

  parsePokimon: async (req, res, next) => {
    const arrayOfPokemon = res.locals.data;
    const queryArray = arrayOfPokemon.map((pokemon, index) => {
      const {
        id,
        name,
        images: { large },
      } = pokemon;

      let url;
      let updatedAt;
      let prices;

      if (pokemon.tcgplayer) {
        url = pokemon.tcgplayer.url ? pokemon.tcgplayer.url : '';
        updatedAt = pokemon.tcgplayer.updatedAt
          ? pokemon.tcgplayer.updatedAt
          : '';
        prices = pokemon.tcgplayer.prices ? pokemon.tcgplayer.prices : '';
      } else {
        url = pokemon.cardmarket.url ? pokemon.cardmarket.url : '';
        updatedAt = '2000/10/10';
        prices = pokemon.cardmarket.prices ? pokemon.cardmarket.prices : '';
      }

      let pricesToJSon = JSON.stringify(prices);
      return [id, url, updatedAt, pricesToJSon, name, large];
    });
    // console.log(queryArray);
    let str =
      'INSERT INTO pokemon (id_in_set, tcgplayer_url, tcgplayer_updated_at, tcgplayer_prices, name, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

    const client = await pool.connect();

    try {
      //Begin connection between the client
      await client.query('BEGIN');

      // Execute the SQL statement for each row
      for (const row of queryArray) {
        await client.query(str, row);
      }
      // commit transaction
      await client.query('COMMIT');

      console.log(`Inserted ${queryArray.length} rows into pokemon table`);
    } catch (err) {
      await client.query('ROLLBACK');
      next({ log: err });
    } finally {
      client.release();
    }

    next();
  },
};
