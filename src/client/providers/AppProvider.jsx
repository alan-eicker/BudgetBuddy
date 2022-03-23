import React, { useContext, createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const history = useHistory();
  const [showLoader, setShowLoader] = useState(false);
  const [alert, setAlert] = useState();

  const budgetLimitPercentage = 80;

  useEffect(() => {
    history.listen(() => {
      setAlert();
      document.querySelector('#layout-body').scrollTop = 0;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        alert,
        setAlert,
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
