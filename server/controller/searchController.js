const db = require('../models/pokemon_model');

module.exports = {
  getSearchResult: async (req, res, next) => {
    const { name } = req.body;
    let queryStr = "SELECT * FROM pokemon WHERE name LIKE '%$1%'";

    db.query(queryStr, [name])
      .then((result) => {
        res.locals.results = result.rows;
        next();
      })
      .catch((err) => {
        next({ log: 'error in searchController.getSearchResults' });
      });
  },
};
