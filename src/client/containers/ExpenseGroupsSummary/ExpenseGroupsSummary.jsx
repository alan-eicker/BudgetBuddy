import React from 'react';
import { createPortal } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import useExpenseGroupsSummary from '../../hooks/useExpenseGroupsSummary';
import ExpenseGroupsSummaryHero from '../../components/ExpenseGroupsSummaryHero';
import ExpenseSummaryCard from '../../components/ExpenseSummaryCard';
import { formatDate } from '../../utilities/date';
import {
  getSubTotalFromCollection,
  formatNumber,
  getOverDueExpenses,
} from '../../utilities/numbers';

const ExpenseGroupsSummary = () => {
  const { data } = useExpenseGroupsSummary();

  const getCurrentExpenseGroup = ({ expenseGroups }) => {
    const now = new Date();
    return expenseGroups.find(
      (group) =>
        now >= new Date(group.startDate) && now <= new Date(group.endDate),
    );
  };

  if (data) {
    return (
      <>
        {createPortal(
          <ExpenseGroupsSummaryHero {...getCurrentExpenseGroup(data)} />,
          document.querySelector('#expnense-summary-portal-container'),
        )}
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

                const overdueExpenses = getOverDueExpenses(group.expenses);

                return (
                  <Col
                    className="margin-bottom-16"
                    key={group._id}
                    md={6}
                    lg={4}
                  >
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
      </>
    );
  }

  return null;
};

export default ExpenseGroupsSummary;
