const router = require("express").Router();
const commentModel = require("../models/comment.model.js")

router.post("/recipe/:id", (req, res, next) => {
    const { id } = req.params
    const author = req.session.user._id
    const { title, body } = req.body

    commentModel.create({ idRecipe: id, title, body, author })
        .then(() => {
            res.redirect(`/recipe/${id}`)
        })
        .catch(next)

})
module.exports = router