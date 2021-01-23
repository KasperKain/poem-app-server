require('dotenv').config();
const db = require('./db');
const app = require('./app');

app.set('db', db);

app.listen(process.env.PORT, () => {
  console.log('Server listening');
});
