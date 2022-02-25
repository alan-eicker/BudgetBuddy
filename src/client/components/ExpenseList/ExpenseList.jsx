import React from 'react';
import PropTypes from 'prop-types';
import ExpenseCard from '../ExpenseCard';

const ExpenseList = ({ expenses }) => (
  <ul className="expense-group-list">
    {expenses.map((group, idx) => (
      <li key={`expense-group-${idx + 1}`}>
        <ExpenseCard {...group} />
      </li>
    ))}
  </ul>
);

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      balance: PropTypes.number,
      dueDate: PropTypes.string,
      isPaid: PropTypes.number,
      id: PropTypes.number,
      notes: PropTypes.string,
    }),
  ),
};

ExpenseList.defaultProps = {
  expenses: [],
};

export default ExpenseList;
