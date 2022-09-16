const router = require("express").Router();
const commentModel = require("../models/comment.model.js")

router.post("/recipe/:id", (req, res, next) => {
    const { id } = req.params
    const { title, body } = req.body
    if (req.session.user) {
        const author = req.session.user._id

        commentModel.create({ idRecipe: id, title, body, author })
            .then(() => {
                res.redirect(`/recipe/${id}`)
            })
            .catch(next)
    }
    else {
        res.redirect(`recipe/${id}`);
    }
})
module.exports = router