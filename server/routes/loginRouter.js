const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.use(
  '/',
  userController.getUser,
  userController.cookieCreator,
  (req, res) => {
    res.status(200).json({ authorized: res.locals.login});
  }
);

module.exports = router;
