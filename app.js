var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');

var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config');
var authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var puntoReciclaje = require('./routes/puntoReciclajeRouter');

var db = mongoose.connect(config.mongoUrl);
mongoose.connection.on('error', () => { console.log("Base de datos en problemas") })
mongoose.connection.once('open', () => { console.log("Se ha conectado correctamente") })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/*app.all('*',(req,res)=>{
    res.redirect('https://' + req.headers.host + req.url);
});
app.all('*',(req,res,next)=>{
    if(req.secure){
        console.log("estas en un sitio seguro");
        return next();
    }else{
        res.redirect(301,'https://'+req.hostname+req.url);
    }
});*/
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/puntosRecoleccion', puntoReciclaje);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.json(err);
});


module.exports = app;