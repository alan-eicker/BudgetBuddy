import React, { useContext, createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const budgetLimitPercentage = 80;

  return (
    <AppContext.Provider
      value={{
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
