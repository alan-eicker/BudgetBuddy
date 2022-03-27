const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

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

  app.get('/:type(expense-groups/*)', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist/index.html'), (error) => {
      if (error) {
        res.status(500).send(error);
      }
    });
  });

  const context = ({ req }) => ({ token: req.headers.authorization });

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
