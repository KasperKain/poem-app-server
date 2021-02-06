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
  create(db, style) {
    return db
      .insert(style)
      .into('styles')
      .returning('*')
      .then(([style]) => style);
  },

  get(db, id) {
    return !id
      ? db.select('*').from('styles')
      : db
          .select('*')
          .from('styles')
          .where('id', id)
          .then(([style]) => style);
  },

  update(db, style) {
    return db.from('styles').where('id', style.id).update(style);
  },

  delete(db, id) {
    return db.from('styles').where('id', id).delete();
  },
};

module.exports = {
  serialize,
  queries,
};
