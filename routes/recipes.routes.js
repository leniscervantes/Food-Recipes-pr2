const router = require('express').Router();
const RecipeService = require('../services/recipes.service');
const axiosRecipe = new RecipeService();
const commentModel = require("../models/comment.model.js")


router.get('/search-recipes', (req, res) => {
  res.render("recipes/search-recipes")
})

router.get('/recipe/:id', (req, res, next) => {

  const { id } = req.params

  axiosRecipe
    .getRecipeById(id)
    .then((recipe) => {
      console.log(recipe)
      commentModel.find({ idRecipe: id })
        .populate("author")
        .then((comments) => {
          console.log(comments)
          res.render("recipes/recipe", { recipe, comments, id })
        })
      // tendremos que llamar al modelo CommentModel y buscar los comentarios que tengan la id de la recipe (ordenados por createdAt :D (Bonus))
      // populate de la propieda author para mostrar el nombre del creador del comentario.
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
