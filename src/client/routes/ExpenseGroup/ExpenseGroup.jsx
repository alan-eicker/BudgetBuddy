import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { ButtonControls, Button, Statistic, Hint, Alert } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faPen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../AppProvider';
import ExpenseList from '../../components/ExpenseList';
import ExpenseGroupControls from '../../components/ExpenseGroupControls';
import {
  getSubTotalFromCollection,
  getUnpaidBalanceFromCollection,
  getLeftOverBalance,
  formatNumber,
} from '../../utilities/numbers';
import { formatDate } from '../../utilities/date';

const GET_EXPENSE_GROUP = gql`
  query GetExpenseGroup($id: String!) {
    expenseGroup(_id: $id) {
      _id
      startDate
      endDate
      totalBudget
      expenses {
        _id
        title
        balance
        dueDate
        paid
        note
      }
    }
  }
`;

const UPDATE_PAID_STATUS = gql`
  mutation UpdatePaidStatus($id: String!, $paid: Boolean!) {
    updatePaidStatus(_id: $id, paid: $paid) {
      _id
      title
      balance
      dueDate
      paid
      note
    }
  }
`;

const ExpenseGroup = () => {
  const { setShowLoader, budgetLimitPercentage } = useAppContext();
  const params = useParams();
  const { id } = params;

  const { loading, error, data } = useQuery(GET_EXPENSE_GROUP, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  if (loading) {
    return null;
  }

  if (error) {
    throw new Error(error);
  }

  const group = data.expenseGroup;

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

  const isAlmostOverBudget = expenseRatio > budgetLimitPercentage;

  const overdueExpenses = group.expenses.filter(
    (expense) =>
      expense.dueDate &&
      new Date(expense.dueDate) < new Date() &&
      !expense.paid,
  ).length;

  return (
    <div className="expense-group">
      <ExpenseGroupControls />
      <div className="expense-group__head">
        <h1 className="expense-group__title">
          {formatDate(group.startDate)} - {formatDate(group.endDate)}
          <span>Total Budget: {totalBudget}</span>
        </h1>
        <ButtonControls className="expense-group__controls">
          <Link
            title="edit expense"
            aria-label="edit expense"
            to={`/expense-group/edit/${id}`}
          >
            <Icon icon={faPen} />
          </Link>
          <Button
            theme="red"
            size="md"
            shape="pill"
            title="delete group"
            aria-label="delete group"
            onClick={() => {}}
          >
            <Icon icon={faTimes} />
          </Button>
        </ButtonControls>
      </div>
      <div className="expense-group__body">
        <div className="expense-group__expenses">
          {overdueExpenses > 0 && (
            <Alert theme="error" className="margin-bottom-16">
              You have {overdueExpenses} unpaid overdue expense
              {overdueExpenses > 1 ? 's' : ''}.
            </Alert>
          )}
          <ExpenseList
            expenses={group.expenses}
            onPaidStatusChange={(_id, checked) => console.log(_id, checked)}
          />
        </div>
        <div className="expense-group__summary">
          <h2 className="text-size-20 margin-bottom-20">Spending Snapshot</h2>
          <Statistic
            theme={isAlmostOverBudget ? 'red' : 'green'}
            value={totalBalance}
            label="Total Balance"
            size="md"
            topLabel
          />
          {isAlmostOverBudget && (
            <div className="expense-group__budget-warning">
              <Icon icon={faExclamationTriangle} />
              <Hint type="error">
                Your total balance is greater than {budgetLimitPercentage}% of
                this month&apos;s budget.
              </Hint>
            </div>
          )}
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
