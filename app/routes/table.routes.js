module.exports = (app) => {
  const api = require("../controller/table.controller");
  var router = require("express").Router();

  router.post("/", api.sendAllWorkersList);

  app.use("/api/customTable", router);
};
