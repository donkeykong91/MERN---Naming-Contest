import express from "express";

import data from "../src/testData"

const router = express.Router();

const contests = data.contests.reduce(

  function (contestDictionary, contest) {

    contestDictionary[contest.id] = contest;

    return contestDictionary;

  }, {});


router.get("/contests", function (request, response) {

  response.send({

    contests: contests

  });

});


router.get("/contests/:contestId", function (request, response) {

  let contest = contests[request.params.contestId];

  contest.description = `Lorem ipsum dolor sit amet, erat laoreet, ipsum nullam ultrices purus fermentum massa mattis, sed non faucibus. Ac vel ultrices aliquam, sed commodo ligula volutpat mauris. Maecenas amet in vitae, mi mauris sit neque, volutpat odio, iaculis nisl. Ligula et laoreet, non condimentum mi integer sit quis nulla, libero wisi in commodo aliquam libero, cursus quam wisi feugiat eu. Ac adipiscing mi, taciti tristique maecenas, a sit sed blandit, vel odio tempus, nam fringilla ligula massa ipsum eu integer. Vivamus hendrerit nec, magna condimentum dolor. In sit quisque nisl duis id, sit in, egestas dolor erat auctor mattis mi pede, consectetuer turpis in. Egestas ut amet dictum, pulvinar rhoncus nibh eget pretium, suspendisse a in orci condimentum. Metus quisque mollis sed, nullam nullam urna dolor, non eget elit quam sociis, vitae justo cursus iaculis a risus vivamus, a egestas. Risus augue egestas fringilla aliquam praesent eget, turpis ut nibh, sagittis velit et molestie integer et.`


  response.send(contest);

});


export default router;
