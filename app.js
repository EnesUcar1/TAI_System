'use strict';
const express = require('express');
const express_handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser')
const config = require('./config.json');
let app = express();

const dashboardRoutes = require('./routes/dashboardRoutes');
const signInRoutes = require('./routes/signInRoutes');
const signUpRoutes = require('./routes/signUpRoutes');

app.engine('handlebars', express_handlebars({
  extname: 'handlebars',
  defaultLayout: 'index.handlebars',
  layoutsDir: path.join(__dirname, 'views/shared'),
  partialsDir: [
    path.join(__dirname, 'views/shared'),
  ]
}));

app.set('view engine', 'handlebars');
app.use('/static', express.static(__dirname + '/public'));
app.use(cookieParser());

app.use('/', dashboardRoutes);
app.use('/sign-in', signInRoutes);
app.use('/sign-up', signUpRoutes);

app.listen(config.app.port);
