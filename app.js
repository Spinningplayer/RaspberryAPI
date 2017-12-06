var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;

var routes = require('./routes/routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic('neo4j', 'Skaten01'));
var session = driver.session();

routes(app);

module.exports = app;
