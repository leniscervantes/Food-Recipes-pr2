const router = require("express").Router();
const userModel = require("../models/User.model.js")
const bcrypt = require('bcryptjs');

router.get("/signup", (_req, res, _next) => {
  res.render("auth/signup");
});

router.get("/login", (_req, res, _next) => {
  res.render("auth/login")
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get("/profile", (req, res, _next) => {
  if (!req.session.user === undefined) {
    userModel.findById(req.session.user._id)
      .then((user) => {
        res.render("auth/profile", user)
      })
  }
  else res.redirect("/auth/login")
})

router.get("/edit/:id", (req, res, _next) => {
  const { id } = req.params
  userModel.findById(id)
    .then((user) => {
      res.render("auth/edit-profile", user)
    })
})

router.get('/delete/:id', (req, res, next) => {
  userModel.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch((err) => next(err));
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
      console.log(isPassword)
      if (isPassword) {
        req.session.user = user;
        res.render("auth/profile", req.session.user);
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