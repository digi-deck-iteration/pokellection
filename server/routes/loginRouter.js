const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.use('/logout', userController.endSession, (req, res) => {
  res.status(200).json({ loggedOut: true });
});

router.use(
  '/',
  userController.getUser,
  userController.cookieCreator,
  (req, res) => {
    res.status(200).json({ authorized: res.locals.login});
  }
);


module.exports = router;
