const router = require("express").Router();
const RecipeService = require('../services/recipes.service');
const axiosRecipe = new RecipeService();


router.get("/", (_req, res, _next) => {
  axiosRecipe.getRandomRecipe()
    .then((random) => {
      console.log(random)
      res.render("index", random);
    })
});

module.exports = router;
