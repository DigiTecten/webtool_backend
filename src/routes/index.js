const express = require("express");
const router = express.Router();
const controller = require("../controller/files.controller");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.get("/static/:name", controller.serve);

  app.use(router);
};

module.exports = routes;