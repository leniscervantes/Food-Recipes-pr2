const router = require("express").Router();
const userModel = require("../models/User.model.js")
const bcrypt = require('bcryptjs');


router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
  });

  router.get("/login", (req, res, next) => {
    res.render("auth/login")
  });

  router.get('/logout', (req, res) => {
    console.log("La sesion se va a destruir")
    req.session.destroy();
    console.log("la sesion se ha destruido? ---> ", req.session )
    res.redirect('/');
  });

//POST

router.post('/signup', (req, res, next) => {
    const { username, password, email } = req.body;
    bcrypt
    .genSalt(10)
    .then((salts) => {
      return bcrypt.hash(password, salts);
    })
    .then((pass) => {
      return userModel.create({ password: pass, username, email});
    })
    .then(() => {
      res.redirect('/auth/profile');
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
    const {username, password} = req.body
    let user
    userModel.findOne({username})
    .then((userDB) => {
      user = userDB
      return bcrypt.compare(password, user.password)
    })
    .then((isPassword) => {
      if (isPassword) {
        req.session.user = user;
        res.redirect('/profile');
      } else {
        res.render('auth/login', {message: 'Ususario o contraseña incorrecta!'});
      }
    })  
      .catch((err) => next(err));
  });

module.exports = router;