module.exports = (app) => {
  app.use((_req, res, _next) => {
    res.status(404).render("not-found");
  });

  app.use((err, req, res, _next) => {
    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
      res.status(500).render("error");
    }
  });
};
