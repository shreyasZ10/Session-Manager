const { MongoClient } = require('mongodb');
const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            (username, password, done) =>{
                const url = 'mongodb+srv://shreyasz10:ddC4v3HhKpnYfaxE@zeezee.x6ycm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
                const dbName = 'ZeeZee';

                ( async function validateUser(){
                    let client;
                    try {
                        client = await MongoClient.connect(url);
                        debug('Connected to DB');
                        const db = client.db(dbName);

                        const user = await db.collection('users').findOne({username});

                        if (user && user.password === password){
                            done(null, user);
                        }else{
                            done(null, false);
                        }
                        
                    } catch (error) {
                        done(error, false)
                    }
                }())
            }
        )
    );
};