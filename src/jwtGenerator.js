const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const jwtGenerator = (id) => {
  const payload = {
    user_id: id,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1hr' });
};

module.exports = jwtGenerator;
