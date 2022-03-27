const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  if (!token) {
    throw new AuthenticationError('401 Unauthorized: Login Required');
  }

  const hasValidToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  console.log(hasValidToken);
  if (!hasValidToken) {
    throw new AuthenticationError('401 Unauthorized: Invalid Token');
  }
};

module.exports = verifyToken;
