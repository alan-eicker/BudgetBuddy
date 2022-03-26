/* eslint-disable react/jsx-filename-extension */
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';
import App from './App';
import AppProvider from './providers/AppProvider';
import './styles/main.scss';

(async () => {
  if (process.env.NODE_ENV !== 'production') {
    const axe = await import('react-axe');
    axe(React, ReactDOM, 1000);
  }
})();

const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('userToken');

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </ApolloProvider>,
  document.querySelector('#root'),
);
