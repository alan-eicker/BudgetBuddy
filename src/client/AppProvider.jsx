import React, { useContext, createContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { gql, useLazyQuery } from '@apollo/client';

const VERIFY_TOKEN = gql`
  query {
    verifyToken {
      isValid
    }
  }
`;

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState();

  const budgetLimitPercentage = 80;

  const isProtectedRoute = pathname.match(/expense-group|dashboard/);

  const [verifyToken, { data }] = useLazyQuery(VERIFY_TOKEN, {
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    if (isProtectedRoute) {
      verifyToken();
    }
  }, [pathname]);

  useEffect(() => {
    if (!data) return;

    const { isValid } = data.verifyToken;

    if (!isValid) {
      history.push('/');
    }
  }, [data]);

  return !data && isProtectedRoute ? null : (
    <AppContext.Provider
      value={{
        error,
        setError,
        showLoader,
        setShowLoader,
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
