const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typedefs');

(async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  const csrfMiddleware = csrf({ cookie: true });

  const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
  });

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

  app.use(cookieParser());
  app.use(limiter);
  app.use(helmet());
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  app.use(express.json({ limit: '50kb' }));
  app.use(express.static('dist'));

  app.use('*', csrfMiddleware, (_, res, next) => {
    next();
  });

  app.get('/csrfToken', (req, res) => {
    const { referer } = req.headers;
    const isSAmeOrigin =
      typeof referer !== 'undefined' && !!referer.match(process.env.BASE_URI);

    if (!isSAmeOrigin) throw new Error('403: Forbidden. Request denied.');

    res.send({ csrfToken: req.csrfToken() });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist/index.html'), (error) => {
      if (error) {
        res.status(500).send(error);
      }
    });
  });

  const context = ({ req }) => ({
    token: req.headers.authorization,
    csrfToken: req.cookies._csrf,
  });

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
