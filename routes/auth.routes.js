const router = require("express").Router();
const userModel = require("../models/User.model.js")
const bcrypt = require('bcryptjs');


router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
  });

//POST

router.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    bcrypt
    .genSalt(10)
    .then((salts) => {
      return bcrypt.hash(password, salts);
    })
    .then((pass) => {
      return userModel.create({ password: pass, username });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => next(err));
});

module.exports = router;