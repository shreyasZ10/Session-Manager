const express = require('express');
const debug = require('debug')('app:adminRouter');
const sessions = require('../data/sessions.json')
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

adminRouter.route('/').get((req,res) => {
    const url = process.env.MONGODB_URL;
    const dbName = process.env.MONGODB_DATABASE;

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the url');

            const db = client.db(dbName);

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);
        } catch (error) {
            debug(error.stack);
        }
        client.close();
    }());
});


module.exports = adminRouter;