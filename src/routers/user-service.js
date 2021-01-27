const xss = require('xss');

// SANITIZATION
const serialize = (style) => {
  return {
    id: style.id,
    head_style: xss(style.head_style),
    body_style: xss(style.body_style),
  };
};

// SQL QUERIES
const queries = {
  create(db, user) {
    return db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) returning *',
      [user.email, user.password]
    );
  },
  get(db, email) {
    return db.query('select * from users where email = $1 limit 1', [email]);
  },
  update(db, style) {
    return db.query(
      'UPDATE styles SET head_style = $2, body_style = $3 WHERE id = $1 returning *',
      [style.id, style.head_style, style.body_style]
    );
  },
  delete(db, id) {
    return db.query('DELETE FROM styles WHERE id = $1', [id]);
  },
};

module.exports = {
  serialize,
  queries,
};
