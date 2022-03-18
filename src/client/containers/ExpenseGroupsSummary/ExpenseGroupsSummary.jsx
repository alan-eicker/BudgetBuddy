import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import useExpenseGroupsSummary from '../../hooks/useExpenseGroupsSummary';
import ExpenseSummaryCard from '../../components/ExpenseSummaryCard';
import { formatDate, getDaysPastDue } from '../../utilities/date';
import {
  getSubTotalFromCollection,
  formatNumber,
} from '../../utilities/numbers';

const ExpenseGroupsSummary = () => {
  const { data } = useExpenseGroupsSummary();

  if (data) {
    return (
      <Grid>
        <Row>
          {[...data.expenseGroups]
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((group) => {
              const title = `${formatDate(group.startDate)} - ${formatDate(
                group.endDate,
              )}`;

              const balance = `$${formatNumber(
                getSubTotalFromCollection(group.expenses, 'balance'),
              )}`;

              const overdueExpenses = group.expenses.reduce(
                (prevValue, nextValue) =>
                  nextValue.dueDate &&
                  !nextValue.paid &&
                  getDaysPastDue(nextValue.dueDate).isPastDue
                    ? prevValue + 1
                    : prevValue,
                0,
              );

              return (
                <Col className="margin-bottom-16" key={group._id} md={6} lg={4}>
                  <ExpenseSummaryCard
                    id={group._id}
                    title={title}
                    balance={balance}
                    overdueExpenses={overdueExpenses}
                    isSummary
                  />
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
