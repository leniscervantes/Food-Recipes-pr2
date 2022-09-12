const axios = require('axios');

class AxiosSp {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.spoonacular.com/recipes'
    });
  }
  getRecipes(ingredient) {
    return this.axios.get(`/complexSearch?query=${ingredient}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&instructionsRequired=true&number=10&addRecipeInformation&apiKey=04cf1c837aca4c05b34b6cf3023a8cfb`)
    .then((res) => {
        console.log(res.data)
        res.data})
    .catch((err) => next(err));
  }
}

module.exports = AxiosSp;
