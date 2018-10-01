import express from "express";

import { MongoClient } from "mongodb";

import assert from "assert";

import config from "../config";


let mongoDataBase;

let testDataBase;

MongoClient.connect(config.mongodbUri, { useNewUrlParser: true }, function (error, database) {

  assert.strictEqual(null, error);

  mongoDataBase = database;

  testDataBase = mongoDataBase.db("test");

});


const router = express.Router();


router.get("/contests", function (request, response) {

  let contests = {};

  testDataBase.collection("contests").find({})

              .project({

                id: 1,

                categoryName: 1,

                contestName: 1

              })

              .forEach( function (contest) {

                assert.ok(contest != null);

                contests[contest.id] = contest;

              }, function (error) {

                assert.strictEqual(null, error);

                response.send( { contests } );

              });

});


router.get("/contests/:contestId", function (request, response) {

  testDataBase.collection("contests")

              .findOne({

                id: Number(request.params.contestId)

              })

              .then( function (contest) {

                response.send(contest);

              })

              .catch(console.error);

});


router.get("/names/:nameIds", function (request, response) {

  const nameIds = request.params.nameIds.split(",").map(Number);

  let names = {};

  testDataBase.collection("names").find({ id: { $in: nameIds }})

              .forEach( function (name) {

                assert.ok(name != null);

                names[name.id] = name;

              }, function (error) {

                assert.strictEqual(null, error);

                response.send( { names } );

              });

});


export default router;
