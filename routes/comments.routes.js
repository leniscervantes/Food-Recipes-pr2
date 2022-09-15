const router = require("express").Router();
const commentModel = require("../models/comment.model.js")


// ruta POST pasar por params id recipe y por body (propiedad title, body)
// Generar un comment con las propiedad "title", "body", "author" y "idRecipe"

router.post("/recipe/:id", (req, res, next) => {
    const { id } = req.params
    console.log("esta es la sesion--->", req.session)
    const author = req.session.user._id
    const { title, body } = req.body
    commentModel.create({ idRecipe: id, title, body, author })
        .then((newComment) => {
            res.redirect(`/recipe/${id}`)
        })
        .catch(next)

})
module.exports = router