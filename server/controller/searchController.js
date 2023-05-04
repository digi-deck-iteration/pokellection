const db = require('../models/pokemon_model');

module.exports = {
  getSearchResult: async (req, res, next) => {
    const { name } = req.body;
    console.log(name);
    let queryStr = "SELECT * FROM pokemon WHERE name=$1";

    db.query(queryStr, [name])
      .then((result) => {
        res.locals.results = result.rows;
        console.log(result);
        next();
      })
      .catch((err) => {
        next({ log: 'error in searchController.getSearchResults' });
      });
  },
};
