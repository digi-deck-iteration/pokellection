const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userController = {};

userController.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);

    console.log('req.body', req.body);
    console.log('username', username);
    await console.log('hash', hash);

    User.create({username: username, password: hash});

    try {
        res.locals.newUser = data;
        console.log('data', data);
        return next(); 
    } catch (err){
        const errObj = {
            log: 'Error occurred in user.create',
            status: 400,
            message: 'Error occurred in user.create'
        };
        return next(errObj);
    }
    // .then(data => {
    //     res.locals.newUser = data;
    //     console.log('data', data);
    //     return next(); 
    // })
    // .catch(err => {
    //             const errObj = {
    //                         log: 'Error occurred in user.create',
    //                         status: 400,
    //                         message: 'Error occurred'
    //                     };
    //             return next(errObj);
    // })
}

userController.getUser = (req, res, next) => {
    //const { username } = req.body;
    console.log("before user find one")
    console.log("req body: ", req.body)
    User.findOne({ username:req.body.username })/*, (err, result) => {*/
    .then(async (results) => {
        console.log(results)
        const passwordMatch = await bcrypt.compare(req.body.password, results.password);
        console.log('PASSWORD MATCH: ', passwordMatch);
        res.locals.truthy = passwordMatch;
        return next();
      })
      .catch((err) => {
        console.log('THIS IS THE ERROR: ', err);
        const errObj = {
          log: 'AN ERROR IN THE usercontroller.getuser',
          status: 400,
          message: { err: "chill" },
        };
        return next(errObj);
      });
}


module.exports = userController;