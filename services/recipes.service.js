const axios = require('axios');

class RecipeService {
  constructor() {
    this.URL = 'https://api.spoonacular.com'
    this.axios = axios.create({
      baseURL: this.URL
    });
  }
  getRecipes(ingredient, cuisine, diet, intolerances, maxReadyTime, sort, sortDir) {
    return this.axios.get(`/recipes/complexSearch?query=${ingredient}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&instructionsRequired=true&maxReadyTime=${maxReadyTime}&sort=${sort}&sortDirection=${sortDir}&number=12&apiKey=${process.env.APIKEY}`)
      .then(({ data }) => {
        return data
      })
      .catch((err) => console.log(err));
  }

  getRecipeById(id) {
    return this.axios.get(`/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.APIKEY}`)
      .then(({ data }) => {
        return data
      })
      .catch((err) => console.log(err));
  }

  getRandomRecipe() {
    return this.axios.get(`/recipes/random&apiKey=${process.env.APIKEY}`)
      .then(({ data }) => {
        return data
      })
      .catch((err) => console.log(err));
  }
}

module.exports = RecipeService;
