import React, { useContext, createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({});

export const useAppContent = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [formMode, setFormMode] = useState(); // E.g { mode: 'new' } or { mode: 'edit', id: 1 }
  const [showLoader, setShowLoader] = useState(false);
  const budgetLimitPercentage = 80;

  return (
    <AppContext.Provider
      value={{
        formMode,
        setFormMode,
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
