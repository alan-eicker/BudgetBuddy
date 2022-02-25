import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { ButtonControls, Button, Statistic } from '@atomikui/core';
import ExpenseList from '../../components/ExpenseList';
import ExpenseGroupControls from '../../components/ExpenseGroupControls';
import {
  getSubTotalFromCollection,
  getUnpaidBalanceFromCollection,
  getLeftOverBalance,
  formatNumber,
} from '../../utilities/numbers';

const GET_EXPENSE_GROUP = gql`
  query GetExpenseGroup($id: Int!) {
    expenseGroup(id: $id) {
      id
      title
      totalBudget
      expenses {
        id
        name
        balance
        dueDate
        isPaid
        notes
      }
    }
  }
`;

const ExpenseGroup = () => {
  const params = useParams();
  const id = Number(params.id);

  const { loading, error, data } = useQuery(GET_EXPENSE_GROUP, {
    variables: {
      id,
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    throw new Error(error);
  }

  const group = data?.expenseGroup;

  const subtotal = getSubTotalFromCollection(group.expenses, 'balance');

  const totalBalance = `$${formatNumber(subtotal)}`;

  const totalBudget = `$${formatNumber(group.totalBudget)}`;

  const unpaidBalance = `$${formatNumber(
    getUnpaidBalanceFromCollection(group.expenses, 'balance'),
  )}`;

  const leftOverBalance = `$${formatNumber(
    getLeftOverBalance(group.totalBudget, subtotal),
  )}`;

  const expenseRatio = Math.round((subtotal / group.totalBudget) * 100);

  const isOverBudget = group.totalBudget - subtotal < 0;

  return (
    <div className="expense-group">
      <ExpenseGroupControls />
      <div className="expense-group__head">
        <h1 className="expense-group__title">
          {group.title}
          <span>Total Budget: {totalBudget}</span>
        </h1>
        <ButtonControls align="right">
          <Button theme="indigo" size="md" shape="pill" onClick={() => {}}>
            add expense
          </Button>
          <Button theme="indigo" size="md" shape="pill" onClick={() => {}}>
            edit group
          </Button>
          <Button theme="white" size="md" shape="pill" onClick={() => {}}>
            delete group
          </Button>
        </ButtonControls>
      </div>
      <div className="expense-group__body">
        <div className="expense-group__expenses">
          <ExpenseList expenses={group.expenses} />
        </div>
        <div className="expense-group__summary">
          <h2 className="text-size-20 margin-bottom-20">Spending Snapshot</h2>
          <Statistic
            theme={expenseRatio > 75 ? 'red' : 'green'}
            value={totalBalance}
            label="Total Balance"
            size="md"
            topLabel
          />
          <Statistic
            className="margin-top-20"
            value={unpaidBalance}
            label="Unpaid Balance"
            size="md"
            topLabel
          />
          <Statistic
            {...(isOverBudget && { theme: 'red' })}
            className="margin-top-20"
            value={leftOverBalance}
            label="Left Over Balance"
            size="md"
            topLabel
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseGroup;
