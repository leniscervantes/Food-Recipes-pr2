const axios = require('axios');

class AxiosSp {
  constructor() {
    this.URL = 'https://api.spoonacular.com'
    this.axios = axios.create({
      baseURL: this.URL
    });
  }
  getRecipes(ingredient, cuisine, diet, intolerances) {
    return this.axios.get(`/recipes/complexSearch?query=${ingredient}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&instructionsRequired=true&number=10&addRecipeInformation&apiKey=04cf1c837aca4c05b34b6cf3023a8cfb`)
    .then((res) => {
        return res.data
      })
      
    .catch((err) => next(err));
  }
}

module.exports = AxiosSp;
