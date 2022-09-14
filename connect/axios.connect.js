const axios = require('axios');

class AxiosSp {
  constructor() {
    this.URL = 'https://api.spoonacular.com'
    this.axios = axios.create({
      baseURL: this.URL
    });
  }
  getRecipes(ingredient, cuisine, diet, intolerances, maxReadyTime, sort) {
    return this.axios.get(`/recipes/complexSearch?query=${ingredient}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&instructionsRequired=true&maxReadyTime=${maxReadyTime}&sort=${sort}&number=12&apiKey=64d925c99ad943ac85d54b13b0fa9281`)
    .then((res) => {
        return res.data
      })
      
    .catch((err) => console.log(err));
  }

  getRecipeById(id) {
    return this.axios.get(`/recipes/${id}/information?includeNutrition=true&apiKey=64d925c99ad943ac85d54b13b0fa9281`)
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err));
  }
}

module.exports = AxiosSp;
