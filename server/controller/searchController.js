const db = require('../models/pokemon_model');

module.exports = {
  getSearchResult: async (req, res, next) => {
    const { name } = req.body;
    console.log(name);
    const queryStr = "SELECT * FROM pokemon WHERE name LIKE $1";
    const values = [`%${name}%`];
    db.query(queryStr, values)
      .then((result) => {
        res.locals.results = result.rows;
        console.log(result.rows);
        next();
      })
      .catch((err) => {
        next({ log: 'error in searchController.getSearchResults' });
      });
  },
};
