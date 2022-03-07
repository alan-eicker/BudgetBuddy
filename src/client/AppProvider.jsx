import React, { useContext, createContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

// const VERIFY_TOKEN = gql``;

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const [showLoader, setShowLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasValidToken, setHasValidToken] = useState(true);

  const budgetLimitPercentage = 80;

  const isProtectedRoute = pathname.match(/dashboard|expense-group/);

  // Run useQuery with skip option if isProtectedRoute === false
  // Otherwise, verify token and return `true` or `false` with response;
  // const { loading, error, data } = useQuery(VERIFY_TOKEN, {
  //   skip: !isProtectedRoute
  // });

  useEffect(() => {
    if (!hasValidToken) {
      history.push('/');
    } else {
      history.push(pathname);
    }
  }, [hasValidToken]);

  return (
    <AppContext.Provider
      value={{
        showLoader,
        setShowLoader,
        isLoggedIn,
        setIsLoggedIn,
        budgetLimitPercentage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
