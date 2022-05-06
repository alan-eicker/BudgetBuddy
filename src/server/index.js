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
require('dotenv').config();

const port = process.env.PORT || 8080;

const csrfMiddleware = csrf({ cookie: true });

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
});

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(express.json({ limit: '50kb' }));
app.use(express.static('dist'));

app.use('*', csrfMiddleware, (_, __, next) => {
  next();
});

app.get('/csrfToken', (req, res) => {
  const { referer } = req.headers;
  const isSAmeOrigin =
    typeof referer !== 'undefined' && !!referer.match(process.env.BASE_URI);

  if (!isSAmeOrigin) throw new Error('403: Forbidden. Request denied.');

  res.send({ csrfToken: req.csrfToken() });
});

app.get('*', (_, res) => {
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

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });
});

app.listen(port, () => {
  console.log('App listening on port', port);
});
