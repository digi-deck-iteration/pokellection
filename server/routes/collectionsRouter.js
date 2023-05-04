const express = require('express');
const router = express.Router();

const collectionsController = require('../controller/collectionsController');

router.post(
    '/', 
    collectionsController.addCardsToDeck,
    collectionsController.addDeck, 
    (req,res) => {
        res.status(200).json(res.locals.data);
});

router.get(
    '/', 
    collectionsController.getDeck, 
    (req,res) => {
        res.status(200).json(res.locals.data);
});

module.exports = router;
