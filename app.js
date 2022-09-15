require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);
require('./config/session.config')(app);

const capitalized = require("./utils/capitalized");
const projectName = "Food-Recipes";

app.locals.appTitle = `${capitalized(projectName)}`;

const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth.routes");
app.use("/auth", auth);

const recipes = require("./routes/recipes.routes");
app.use("/", recipes);

const comments = require("./routes/comments.routes");
app.use("/", comments)


require("./error-handling")(app);

module.exports = app;
