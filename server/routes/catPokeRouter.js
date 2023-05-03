const express = require('express');
const router = express.Router();

const catAPIcontroller = require('../controller/catAPIcontroller')


router.get(
    '/',
    catAPIcontroller.call,
    (req, res) => {
      res.status(200).json(res.locals.data)
    });

module.exports = router