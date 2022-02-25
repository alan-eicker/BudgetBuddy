import React from 'react';
import { ButtonControls, Button, Statistic } from '@atomikui/core';
import ExpenseList from '../../components/ExpenseList';
import ExpenseGroupControls from '../../components/ExpenseGroupControls';
import {
  getSubTotalFromCollection,
  getUnpaidBalanceFromCollection,
  getLeftOverBalance,
  formatNumber,
} from '../../utilities/numbers';

const group = {
  id: 1,
  title: 'March 1, 2022 - March 15, 2022',
  totalBudget: 5600,
  expenses: [
    {
      id: 1,
      name: 'Mortgage',
      balance: 2319.78,
      dueDate: '2/1/2022',
      isPaid: 0,
      notes: 'First mortgage payment!',
    },
    {
      id: 2,
      name: 'Credit Card',
      balance: 100,
      dueDate: '2/11/2022',
      isPaid: 1,
    },
    {
      id: 3,
      name: 'Groceries',
      balance: 400,
      dueDate: '2/13/2022',
      isPaid: 1,
    },
  ],
};

const ExpenseGroup = () => {
  const subtotal = getSubTotalFromCollection(group.expenses, 'balance');

  const totalBalance = `$${formatNumber(subtotal)}`;

  const unpaidBalance = `$${formatNumber(
    getUnpaidBalanceFromCollection(group.expenses, 'balance'),
  )}`;

  const leftOverBalance = `$${formatNumber(
    getLeftOverBalance(group.totalBudget, subtotal),
  )}`;

  const totalBudge = `$${formatNumber(group.totalBudget)}`;

  const expenseRatio = Math.round((subtotal / group.totalBudget) * 100);

  return (
    <div className="expense-group">
      <ExpenseGroupControls />
      <div className="expense-group__head">
        <h1 className="expense-group__title">
          {group.title}
          <span>Total Budget: {totalBudge}</span>
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
          <h2 className="text-size-20 margin-bottom-16">Spending Snapshot</h2>
          <Statistic
            theme={expenseRatio > 75 ? 'red' : 'green'}
            value={totalBalance}
            label="Total Balance"
            size="md"
            topLabel
          />
          <Statistic
            className="margin-top-16"
            value={unpaidBalance}
            label="Unpaid Balance"
            size="md"
            topLabel
          />
          <Statistic
            className="margin-top-16"
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
