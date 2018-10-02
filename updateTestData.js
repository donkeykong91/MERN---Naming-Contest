import { MongoClient } from 'mongodb';

import assert from 'assert';

import config from './config';


MongoClient.connect(config.mongodbUri, function (error, client) {

  assert.equal(null, error);


  let contestCount = 0;

  let testDataBase = client.db("test");

  let contests = testDataBase.collection("contests");

  contests.find({}).each((error, contest) => {

    assert.equal(null, error);

    if (!contest) { return; }

    contestCount++;

    let names = testDataBase.collection("names");

    names.find({ id: { $in: contest.nameIds }})

      .project({ _id: 1 })

      .toArray()

      .then(_ids => {

        const newIds = _ids.map(o => o._id);

        contests.updateOne(

          { id: contest.id },

          { $set: { nameIds: newIds } }

        ).then(() => {

          console.info('Updated', contest._id);

          contestCount--;

          if (contestCount === 0) { client.close(); }

        });

      })

      .catch(console.error);

  });


});
