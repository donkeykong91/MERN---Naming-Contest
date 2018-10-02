import express from "express";

import { MongoClient, ObjectID } from "mongodb";

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

                categoryName: 1,

                contestName: 1

              })

              .forEach( function (contest) {

                assert.ok(contest != null);

                contests[contest._id] = contest;

              }, function (error) {

                assert.strictEqual(null, error);

                response.send( { contests } );

              });

});


router.get("/contests/:contestId", function (request, response) {

  testDataBase.collection("contests")

              .findOne({

                _id: ObjectID(request.params.contestId)

              })

              .then( function (contest) {

                response.send(contest);

              })

              .catch(console.error);

});


router.get("/names/:nameIds", function (request, response) {

  const nameIds = request.params.nameIds.split(",").map(ObjectID);

  let names = {};

  testDataBase.collection("names").find({ _id: { $in: nameIds }})

              .forEach( function (name) {

                assert.ok(name != null);

                names[name._id] = name;

              }, function (error) {

                assert.strictEqual(null, error);

                response.send( { names } );

              });

});


export default router;
