const express = require('express');
const router = express.Router();

const collectionsController = require('../controller/collectionsController');

router.post(
    '/deck', 
    collectionsController.getCards, 
    (req,res) => {
        console.log("Hit end of /deck router");
        res.status(200).json(res.locals.data);
});

router.post(
    '/', 
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
