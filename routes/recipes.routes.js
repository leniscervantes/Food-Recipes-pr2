const router = require('express').Router();
const AxiosSp = require('../connect/axios.connect');
const axiosRecipe = new AxiosSp();



router.get('/search-recipes', (req, res) => {
  res.render("recipes/search-recipes")
})

router.get('/recipe/:id', (req, res, next) => {
  axiosRecipe
    .getRecipeById(req.params.id)
    .then((recipe) => {
      res.render("recipes/recipe",recipe)
    })
    .catch((err) => next(err));
});



router.post("/search-recipes", (req, res, next) => {
  const {ingredient, maxReadyTime, cuisine, diet, intolerances, sort} = req.body
  console.log(req.body)
    axiosRecipe
    .getRecipes(ingredient,cuisine, diet, intolerances, maxReadyTime, sort)
    .then((recipes) => {
      res.render("recipes/result-recipes", recipes)
     
      })
    .catch((err) => next(err))
})

module.exports = router;
