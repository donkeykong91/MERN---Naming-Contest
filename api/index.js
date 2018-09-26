import express from "express";

import data from "../src/testData"

const router = express.Router();

const contests = data.contests.reduce(function (contestDictionary, contest) {

                   contestDictionary[contest.id] = contest;

                   return contestDictionary;

                 }, {});


router.get("/contests", function (request, response) {

  response.send({

    contests: contests

  });

});

export default router;
