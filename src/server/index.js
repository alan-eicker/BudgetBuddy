const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const rootValue = require('./graphql/resolvers');
const schema = buildSchema(require('./graphql/schema'));

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

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
