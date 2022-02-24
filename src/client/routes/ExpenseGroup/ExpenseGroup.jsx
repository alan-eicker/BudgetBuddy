import React from 'react';
import { ButtonControls, Button } from '@atomikui/core';
import ExpenseList from '../../components/ExpenseList';

const data = {
  title: 'March 1, 2022 - March 15, 2022',
  totalBudget: 5600,
  expenses: [
    {
      id: 1,
      name: 'Mortgage',
      balance: 2320.78,
      dueDate: '3/1/2022',
      isPaid: 0,
      notes: 'First mortgage payment!',
    },
    {
      id: 2,
      name: 'Credit Card',
      balance: 100,
      dueDate: '3/11/2022',
      isPaid: 1,
    },
    {
      id: 3,
      name: 'Groceries',
      balance: 400,
      dueDate: '3/11/2022',
      isPaid: 0,
    },
  ],
};

const ExpenseGroup = () => (
  <div className="expense-group">
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
    <ExpenseList expenses={data.expenses} />
  </div>
);

export default ExpenseGroup;
