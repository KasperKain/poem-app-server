const db = require('./db');
const app = require('./app');
const { PORT } = require('./config');

app.set('db', db);

app.listen(PORT, () => {
  console.log('Server listening');
});
