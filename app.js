const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouters');
const authRouter = require('./src/routers/authRouter');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000
const path = require('path');
const req = require('express/lib/request');
const { Session } = require('express-session');

dotenv.config();
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:'ZeeZee'}));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render("index", {title: "ZEEZEE", data: ['a', 'b', 'c']});
});

app.listen(3000, () => {
    debug(`Listening to Port ${chalk.green('3000')}`);
});