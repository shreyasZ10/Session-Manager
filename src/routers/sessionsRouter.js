const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const sessionsRouter = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

sessionsRouter.use((req, res, next) => {
    if (req.user) {
        next();
    }
    else{
        res.redirect('/auth/signIn');
    }
})

sessionsRouter.route('/').get((req, res) => {
    const url = process.env.MONGODB_URL;
    const dbName = process.env.MONGODB_URL;
    
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the url');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', {sessions});
        } catch (error) {
            debug(error.stack);
        }
        client.close();
    })();
});

sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id
    const url = 'mongodb+srv://shreyasz10:ddC4v3HhKpnYfaxE@zeezee.x6ycm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'ZeeZee';

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the url');

            const db = client.db(dbName);

            const session = await db.collection('sessions').findOne({_id : new ObjectId(id)})
            res.render('session', {session});
        } catch (error) {
            debug(error.stack);
        }
        client.close();
    })();
});

module.exports = sessionsRouter;