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
  req.session.destroy();
  res.redirect('/');
});

router.get("/profile", (req, res, next) => {
  userModel.findById(req.session.user._id)
    .then((user) => {
      res.render("auth/profile", user)
    })
})
router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params
  userModel.findById(id)
    .then((user) => {
      res.render("auth/profile", user)
    })
})

router.get("/edit/:id", (req, res, next) => {
  const { id } = req.params
  userModel.findById(id)
    .then((user) => {
      res.render("auth/edit-profile", user)
    })
})


//POST

router.post('/signup', (req, res, next) => {
  const { username, password, email } = req.body;
  bcrypt
    .genSalt(10)
    .then((salts) => {
      return bcrypt.hash(password, salts);
    })
    .then((pass) => {
      return userModel.create({ password: pass, username, email });
    })
    .then(() => {
      res.redirect('/auth/login');
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body
  let user
  userModel.findOne({ username })
    .then((userDB) => {
      user = userDB
      return bcrypt.compare(password, user.password)
    })
    .then((isPassword) => {
      if (isPassword) {
        req.session.user = user;
        res.redirect(`/auth/profile/${req.session.user._id}`);
      } else {
        res.render('auth/login', { message: 'Usuario o contraseña incorrecta!' });
      }
    })
    .catch((err) => next(err));
})

router.post('/edit/:id', (req, res, next) => {
  const { username, email, password } = req.body;
  userModel.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true })
    .then((user) => {
      res.render("auth/profile", user)
    })
    .catch((err) => next(err));
});

module.exports = router;