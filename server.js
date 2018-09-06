import config from "./config";

import apiRouter from "./api";

import fs from "fs";

import express from "express";

const server = express();


server.set("view engine", "ejs");


server.get("/", function (request, response) {

  response.send("Hello Express");

});


server.use(express.static("public"));

server.use("/api", apiRouter);


server.listen(config.port, function () {

  console.info("Express listening on port ", config.port);

});
