const { NODE_ENV } = require('./config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const poems = require('./poem/poem-router');
const styles = require('./style/style-router');

//middleware
app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common'));
app.use(express.json());

//routes
app.use('/api/poems', poems);
app.use('/api/styles', styles);

app.get('/api/', (req, res) => {
  res.send('All Good!');
});

module.exports = app;
