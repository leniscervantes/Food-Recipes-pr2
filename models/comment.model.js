const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        body: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const CommentModel = model("comments", CommentSchema);

module.exports = CommentModel;
