const { NODE_ENV } = require('./config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const poems = require('./routers/poem-router');
const styles = require('./routers/style-router');

//middleware
app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common'));
app.use(express.json());

//routes
app.use('/poems', poems);
app.use('/styles', styles);

module.exports = app;
