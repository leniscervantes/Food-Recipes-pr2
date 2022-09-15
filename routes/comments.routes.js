const router = require("express").Router();
const commentModel = require("../models/comment.model.js")


// ruta POST pasar por params id recipe y por body (propiedad title, body)
// Generar un comment con las propiedad "title", "body", "author" y "idRecipe"

router.post("/recipe/:id", (req, res, next) => {
    const { id } = req.params
    const author = req.session.user._id
    console.log("este es el author--->", author)
    const { title, body } = req.body
    commentModel.create({ idRecipe: id, title, body, author })
        .then(() => {
            res.redirect(`/recipe/${id}`)
        })
        .catch(next)

})
module.exports = router