const db = require('./db');
const app = require('./app');
const { PORT } = require('./config');

app.set('db', db);

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { error };
    res.status(500).json(response);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
