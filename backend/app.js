var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var mainRouter = require("./routes/index");
var secretKey = 'your_secret_key';

var app = express();
app.use(cors());

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose instanceof mongoose.Mongoose; // true
mongoose.set('strictQuery', false);
const m = new mongoose.Mongoose();
const mongoDB = "mongodb+srv://jajao:jajao12345@cluster0.fdardxf.mongodb.net/?retryWrites=true&w=majority";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
  await m.createConnection(mongoDB).dropCollection("users");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use("/", mainRouter); // Add catalog routes to middleware chain.

// Middleware for authentication
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided.' });
  }

  // verifies secret and checks exp
  jwt.verify(token, secretKey, function(err, decoded) {
    if (err) {
      return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
    }

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
});

//Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
  next();
});

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
  res.render('error');
});

module.exports = app;
