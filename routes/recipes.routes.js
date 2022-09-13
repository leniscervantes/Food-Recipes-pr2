const router = require('express').Router();
const AxiosSp = require('../connect/axios.connect');
const axiosRecipe = new AxiosSp();



router.get('/search-recipes', (req, res, next) => {
  res.render("recipes/search-recipes")
    })


    router.post("/search-recipes", (req, res, next) => {
        const {ingredient, cuisine, diet, intolerances, maxReadyTime, sort} = req.body
        axiosRecipe
        .getRecipes(ingredient,cuisine, diet, intolerances, maxReadyTime, sort)
        .then((recipes) => {
          res.render("recipes/result-recipes", recipes)
        
      })
      .catch((err) => next(err))
})

module.exports = router;
