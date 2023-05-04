const express = require('express');
const router = express.Router();

const searchController = require('../controller/searchController')

router.post('/', searchController.getSearchResult, (req, res) => {
    res.status(200).json(res.locals.results)
})

module.exports = router