const router = require('express').Router();
const AxiosSp = require('../connect/axios.connect');
const axiosCharacter = new AxiosSp();



router.get('/search-recipes', (req, res, next) => {
  
      res.render("recipes/search-recipes")
    })


    router.post("/search-recipes", (req, res, next) => {
        const {ingredient, cuisine, diet, intolerances} = req.body
        axiosCharacter
        .getRecipes(ingredient,cuisine, diet, intolerances)
        .then((recipes) => {
          res.json(recipes)
        //   res.redirect("/results")
    })
})

module.exports = router;
