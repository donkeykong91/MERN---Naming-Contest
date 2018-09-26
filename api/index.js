import express from "express";

import data from "../src/testData"

const router = express.Router();

router.get("/contests", function (request, response) {

  response.send({

    contests: data.contests.reduce(function (contestDictionary, contest) {

      contestDictionary[contest.id] = contest;

      return contestDictionary;

    }, {})

  });

});

export default router;
