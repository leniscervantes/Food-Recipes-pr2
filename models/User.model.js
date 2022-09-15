const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'recipe' }]
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
