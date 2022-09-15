const router = require("express").Router();
const RecipeService = require('../services/recipes.service');
const axiosRecipe = new RecipeService();


router.get("/", (_req, res, _next) => {
  axiosRecipe.getRandomRecipe()
    .then((data) => {
      console.log("Esta es la random --->", data)
      res.render("index", { data });
    })
});

module.exports = router;
