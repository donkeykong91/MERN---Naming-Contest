import config from "./config";

import apiRouter from "./api";

import fs from "fs";

import express from "express";

import sassMiddleware from "node-sass-middleware";

import path from "path";

import serverRender from  "./serverRender";

const server = express();


server.set("view engine", "ejs");


server.get("/", function (request, response) {

  serverRender()

    .then( function (content) {

      response.render("index", {

        content

      });

    })

    .catch(console.error);


});


server.use(express.static("public"));

server.use("/api", apiRouter);

server.use(

  sassMiddleware(

    {

      src: path.join(__dirname, "sass"),

      dest: path.join(__dirname, "public")

    }

  )

);


server.listen(config.port, config.host, function () {

  console.info("Express listening on port ", config.port);

});
