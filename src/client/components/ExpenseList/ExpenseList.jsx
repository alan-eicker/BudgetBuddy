import React from 'react';
import PropTypes from 'prop-types';
import ExpenseCard from '../ExpenseCard';
import ExpenseProvider from '../../providers/ExpenseProvider';

const ExpenseList = ({ expenses, ...props }) => (
  <ExpenseProvider>
    <ul className="expense-group-list">
      {expenses.map((group, idx) => (
        <li key={`expense-group-${idx + 1}`}>
          <ExpenseCard {...group} {...props} />
        </li>
      ))}
    </ul>
  </ExpenseProvider>
);

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      balance: PropTypes.number,
      dueDate: PropTypes.string,
      paid: PropTypes.bool,
      note: PropTypes.string,
    }),
  ),
};

ExpenseList.defaultProps = {
  expenses: [],
};

export default ExpenseList;
