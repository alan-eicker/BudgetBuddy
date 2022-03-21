import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { gql, useLazyQuery } from '@apollo/client';

const VERIFY_TOKEN = gql`
  query {
    response: verifyToken {
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
  const [alert, setAlert] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [destinationPath, setDestinationPath] = useState('/');

  const budgetLimitPercentage = 80;

  const isProtectedRoute = pathname.match(/expense-groups/);

  const [verifyToken] = useLazyQuery(VERIFY_TOKEN, {
    onError: (err) => setAlert({ type: 'error', message: err.message }),
    onCompleted: ({ response }) => {
      if (!response.isValid) {
        setLoggedIn(false);
      }
    },
  });

  useEffect(() => {
    history.listen(() => {
      setDestinationPath(pathname);
      setAlert();
      if (loggedIn) {
        document.querySelector('#layout-body').scrollTop = 0;
      }
    });
  }, []);

  useEffect(() => {
    if (isProtectedRoute) {
      verifyToken();
    }
  }, [pathname]);

  useEffect(() => {
    if (!loggedIn) {
      history.push(destinationPath);
    }
  }, [loggedIn, history]);

  return !loggedIn && isProtectedRoute ? null : (
    <AppContext.Provider
      value={{
        alert,
        setAlert,
        showLoader,
        setShowLoader,
        setLoggedIn,
        budgetLimitPercentage,
        destinationPath,
        setDestinationPath,
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
