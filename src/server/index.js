const dotenv = require('dotenv');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const rootValue = require('./graphql/resolvers');
const schema = buildSchema(require('./graphql/schema'));

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

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);

app.listen(port, () => {
  console.log('App listening on port', port);
});
