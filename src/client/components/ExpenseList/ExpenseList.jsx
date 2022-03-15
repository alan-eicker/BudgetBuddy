import React from 'react';
import PropTypes from 'prop-types';
import ExpenseCard from '../ExpenseCard';
import ExpenseListProvider from '../../providers/ExpenseListProvider';

const ExpenseList = ({ expenses, ...props }) => (
  <ExpenseListProvider>
    <ul className="expense-group-list">
      {expenses.map((group, idx) => (
        <li key={`expense-group-${idx + 1}`}>
          <ExpenseCard {...group} {...props} />
        </li>
      ))}
    </ul>
  </ExpenseListProvider>
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
