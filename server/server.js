const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
require('dotenv').config()
const db = require('./models/db');
const oAuthSessionModel = require('./models/oAuthSessionModel');
const oAuthRouter = require('./routes/oAuthRouter');
const uploadRouter = require('./routes/uploadRouter');
const searchRouter = require('./routes/searchRouter');
const catPokeRouter = require('./routes/catPokeRouter');
const signupRouter = require('./routes/signupRouter');
const pokemonRouter = require('./routes/pokemonRouter');
const loginRouter = require('./routes/loginRouter');
const collectionsRouter = require('./routes/collectionsRouter');


require('dotenv').config();

// app.use('/', express.static(path.join(__dirname,'')))
app.use(express.json());
app.use(cookieParser());


//AUTHENTICATION ROUTE
app.get('/api/isloggedin', (req, res) => {
  const { ssid } = req.cookies;
  console.log("SSID cookie", ssid)
  oAuthSessionModel.findOne({ cookieId: ssid }).then((authenticatedUser) => {
    if (!authenticatedUser) res.status(200).json({ authenticated: false });
    else res.status(200).json({ authenticated: true });
  });
});

//ROUTERS
app.use('/api/signup', signupRouter);
app.use('/api/pokemon', pokemonRouter);
app.use('/api/login', loginRouter);
app.use('/api/catRouter', catPokeRouter);
app.use('/api/oauth', oAuthRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/search', searchRouter );
app.use('/api/collections', collectionsRouter);


// CATCH ALL
app.use('*', (req, res) => {
  res.sendStatus(404);
});

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler hiiiiii caught unknown middleware error',
    status: 400,
    message: { err: 'An error global occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// SERVER
app.listen(PORT, () => {
  console.log('listening on a port:', PORT);
});
