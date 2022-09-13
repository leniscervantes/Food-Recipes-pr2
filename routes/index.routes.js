const router = require("express").Router();
const userModel = require("../models/User.model.js")


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile/:id", (req, res, next) => {
  const {id} = req.params
userModel.findById(id)
.then(user)
  res.render("auth/login", user)
})

module.exports = router;
