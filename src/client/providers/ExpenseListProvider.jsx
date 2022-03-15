import React, { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

const ExpenseListContext = createContext({});

export const useExpenseListContext = () => useContext(ExpenseListContext);

const ExpenseListProvider = ({ children }) => {
  const [deleteId, setDeleteId] = useState();

  return (
    <ExpenseListContext.Provider value={{ deleteId, setDeleteId }}>
      {children}
    </ExpenseListContext.Provider>
  );
};

ExpenseListProvider.propTypes = {
  children: PropTypes.node,
};

ExpenseListProvider.defaultProps = {
  children: <></>,
};

export default ExpenseListProvider;
