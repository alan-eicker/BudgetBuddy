/* eslint-disable react/jsx-filename-extension */
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';
import './styles/main.scss';

(async () => {
  if (process.env.NODE_ENV !== 'production') {
    const axe = await import('react-axe');
    axe(React, ReactDOM, 1000);
  }
})();

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache({}),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.querySelector('#root'),
);
