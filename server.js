import config from "./config";

import apiRouter from "./api";

import fs from "fs";

import express from "express";

import sassMiddleware from "node-sass-middleware";

import path from "path";

import serverRender from  "./serverRender";

import bodyParser from "body-parser";

const server = express();


server.set("view engine", "ejs");


server.get(["/", "/contest/:contestId"], function (request, response) {

  serverRender(request.params.contestId)

    .then( function ( { initialMarkup, initialData }={} ) {

      response.render("index", {

        initialMarkup,

        initialData

      });

    })

    .catch( function(error) {

      console.error(error);

      response.status(404).send("Bad Request");

    });
    
});


server.use(bodyParser.json());

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
