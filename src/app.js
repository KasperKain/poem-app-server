const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const poems = require('./routers/poem-router');

//middleware
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

//routes
app.use('/poems', poems);

module.exports = app;
