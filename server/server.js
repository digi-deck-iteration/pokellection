const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

<<<<<<< HEAD
const signupRouter = require('./routes/signupRouter')
const pokemonRouter = require('./routes/pokemonRouter')
const loginRouter = require('./routes/loginRouter')
const catPokeRouter = require('./routes/catPokeRouter');
require('dotenv').config()
=======
const db = require('./models/db');
const oAuthSessionModel = require('./models/oAuthSessionModel');
const signupRouter = require('./routes/signupRouter');
const pokemonRouter = require('./routes/pokemonRouter');
const loginRouter = require('./routes/loginRouter');
const oAuthRouter = require('./routes/oAuthRouter');
require('dotenv').config();
>>>>>>> a95ff8353bc3bdedfb18bb98be7e3c291fdf07f2
// app.use('/', express.static(path.join(__dirname,'')))
app.use(express.json());
app.use(cookieParser());


//AUTHENTICATION ROUTE
app.get('/api/isloggedin', (req, res) => {
  const { cookie } = req.cookies;
  console.log("COOKIES", cookie)
  oAuthSessionModel.findOne({ cookieId: cookie }).then((authenticatedUser) => {
    if (!authenticatedUser) res.status(200).json({ authenticated: false });
    res.status(200).json({ authenticated: true });
  });
});

//ROUTERS
app.use('/api/signup', signupRouter);
app.use('/api/pokemon', pokemonRouter);
app.use('/api/login', loginRouter);
<<<<<<< HEAD
app.use('/api/catRouter', catPokeRouter);


=======
app.use('/api/oauth', oAuthRouter);
>>>>>>> a95ff8353bc3bdedfb18bb98be7e3c291fdf07f2

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
