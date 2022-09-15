const { Schema, model } = require("mongoose");


const recipeShema = new Schema(
    {
        extendedIngredients: [
            {
                name: { type: String },
                original: { type: String }
            }],
        readyInMinutes: {
            type: number
        },
        summary: { type: String },

        instructions: { type: String },
        comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
    },
    {
        timestamps: true,
    }
);

const recipeModel = model("recipe", recipeSchema);

module.exports = recipeModel;