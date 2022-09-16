const router = require('express').Router();
const RecipeService = require('../services/recipes.service');
const axiosRecipe = new RecipeService();
const commentModel = require("../models/comment.model.js")


router.get('/search-recipes', (req, res) => {
  res.render("recipes/search-recipes")
})

router.get('/recipe/:id', (req, res, next) => {
  let user = false
  const { id } = req.params
  if (req.session.user) { user = true }
  axiosRecipe
    .getRecipeById(id)
    .then((recipe) => {
      commentModel.find({ idRecipe: id })
        .populate("author")
        .then((comments) => {
          res.render("recipes/recipe", { recipe, comments, id, user })
        })
    })
    .catch((err) => next(err));
});



router.post("/search-recipes", (req, res, next) => {

  const { ingredient, maxReadyTime, cuisine, diet, intolerances, sort, sortDir } = req.body

  axiosRecipe
    .getRecipes(ingredient, cuisine, diet, intolerances, maxReadyTime, sort, sortDir)
    .then((recipes) => {
      res.render("recipes/result-recipes", recipes)
    })
    .catch((err) => next(err))
})

module.exports = router;
