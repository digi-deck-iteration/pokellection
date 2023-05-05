const express = require('express');
const router = express.Router();

const uploadController = require('../controller/uploadController');

router.get('/', uploadController.fetchPokimon, uploadController.parsePokimon, (req, res) => {
  res.status(200).json(res.locals.data1s);
});

module.exports = router;
