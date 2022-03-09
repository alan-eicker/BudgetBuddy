import React from 'react';
import useExpenseGroupsSummary from './useExpenseGroupsSummary';
import { formatDate } from '../../utilities/date';

const ExpenseGroupsSummary = () => {
  const { data } = useExpenseGroupsSummary();

  if (data) {
    return (
      <div className="expense-groups-summary">
        {data.expenseGroups.map(
          ({ _id, startDate, endDate, totalBudget, expenses }) => {
            const title = `${formatDate(startDate)} - ${formatDate(endDate)}`;

            return (
              <div className="expense-groups-summary__item" key={_id}>
                {title}
              </div>
            );
          },
        )}
      </div>
    );
  }

  return null;
};

export default ExpenseGroupsSummary;
