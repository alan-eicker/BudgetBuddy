const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typedefs');

(async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  dotenv.config();

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.static('dist'));

  const context = ({ req }) => {
    const token = req.headers.authorization || '';

    return {
      token: !token
        ? false
        : jwt.verify(token.split(' ')[1], process.env.JWT_SECRET),
    };
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(port, () => {
    console.log('App listening on port', port);
  });
})();
