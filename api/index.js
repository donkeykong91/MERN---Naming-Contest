import express from "express";

const router = express.Router();

router.get("/", function (request, response) {

  response.send({

    data: []

  });

});

export default router;
