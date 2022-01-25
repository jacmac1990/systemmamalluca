const express = require('express');
const morgan = require('morgan');
const pool = require('./settings/db');
const exphbs = require('express-handlebars');
const { database } = require('./settings/keys');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const passport = require('passport');

//initialization
const app = express();
require('./lib/passport');

//setting
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  
}));
app.set('view engine', '.hbs');
     


// middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
  }));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Global Variable
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//routers o rutas.
app.use(require('./routes/index'));
app.use(require('./routes/authetication'));
app.use(require('./routes/reservation'));
app.use(require('./routes/tours'));

//public, carpetas que el serviudor puede acceder

app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
});