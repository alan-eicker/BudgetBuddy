import React from 'react';
import { ButtonControls, Button, Statistic } from '@atomikui/core';
import ExpenseList from '../../components/ExpenseList';
import ExpenseGroupControls from '../../components/ExpenseGroupControls';
import {
  getSubTotalFromCollection,
  getUnpaidBalanceFromCollection,
  formatNumber,
} from '../../utilities/numbers';

const data = {
  id: 1,
  title: 'March 1, 2022 - March 15, 2022',
  totalBudget: 5600,
  expenses: [
    {
      id: 1,
      name: 'Mortgage',
      balance: 2320.78,
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
  const subtotal = `$${formatNumber(
    getSubTotalFromCollection(data.expenses, 'balance'),
  )}`;

  const unpaidBalance = `$${formatNumber(
    getUnpaidBalanceFromCollection(data.expenses, 'balance'),
  )}`;

  return (
    <div className="expense-group">
      <ExpenseGroupControls />
      <div className="expense-group__head">
        <h1 className="expense-group__title">
          {data.title}
          <span>Total Budget: ${data.totalBudget}</span>
        </h1>
        <ButtonControls align="right">
          <Button theme="indigo" size="md" shape="pill">
            add expense
          </Button>
          <Button theme="indigo" size="md" shape="pill">
            edit group
          </Button>
          <Button theme="white" size="md" shape="pill">
            delete group
          </Button>
        </ButtonControls>
      </div>
      <div className="expense-group__body">
        <div className="expense-group__expenses">
          <ExpenseList expenses={data.expenses} />
        </div>
        <div className="expense-group__summary">
          <h2 className="text-size-20 margin-bottom-16">Spending Snapshot</h2>
          <Statistic
            value={subtotal}
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
        </div>
      </div>
    </div>
  );
};

export default ExpenseGroup;
