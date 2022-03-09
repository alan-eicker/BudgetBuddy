import React from 'react';
import useExpenseGroupsSummary from './useExpenseGroupsSummary';

const ExpenseGroupsSummary = () => {
  const { data } = useExpenseGroupsSummary();

  if (data) {
    return (
      <div className="expense-groups-summary">
        {data.expenseGroups.map(({ _id, startDate, endDate, totalBudget }) => (
          <div className="expense-groups-summary__item" key={_id}>
            {_id}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ExpenseGroupsSummary;
