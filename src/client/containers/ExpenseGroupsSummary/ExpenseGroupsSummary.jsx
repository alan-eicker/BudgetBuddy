import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import useExpenseGroupsSummary from './useExpenseGroupsSummary';
import ExpensCard from '../../components/ExpenseCard';
import { formatDate, getDaysPastDue } from '../../utilities/date';
import { getSubTotalFromCollection } from '../../utilities/numbers';

const ExpenseGroupsSummary = () => {
  const { data } = useExpenseGroupsSummary();

  if (data) {
    return (
      <Grid>
        <Row>
          {data.expenseGroups.map((group) => {
            const title = `${formatDate(group.startDate)} - ${formatDate(
              group.endDate,
            )}`;

            const balance = getSubTotalFromCollection(
              group.expenses,
              'balance',
            );

            const hasOverdueExpenses =
              group.expenses.reduce(
                (prevValue, nextValue) =>
                  nextValue.dueDate &&
                  !nextValue.paid &&
                  getDaysPastDue(nextValue.dueDate) > 0
                    ? prevValue + 1
                    : prevValue,
                0,
              ) > 0;

            return (
              <Col className="margin-bottom-16" key={group._id} md={6}>
                <Link
                  className="text-decoration-none"
                  to={`/expense-groups/${group._id}`}
                >
                  <ExpensCard
                    title={title}
                    balance={balance}
                    hasOverdueExpenses={hasOverdueExpenses}
                    isSummary
                    {...group}
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      </Grid>
    );
  }

  return null;
};

export default ExpenseGroupsSummary;
