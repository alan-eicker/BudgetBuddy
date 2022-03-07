import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAppContext } from '../../AppProvider';
import ExpenseGroupLayout from '../../components/ExpenseGroupLayout';
import {
  getSubTotalFromCollection,
  getUnpaidBalanceFromCollection,
  getLeftOverBalance,
  formatNumber,
} from '../../utilities/numbers';

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
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_EXPENSE_GROUP, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  if (error) {
    throw new Error(error);
  }

  if (data) {
    const group = data.expenseGroup;

    const subtotal = getSubTotalFromCollection(group.expenses, 'balance');

    const totalBalance = `$${formatNumber(subtotal)}`;

    const totalBudgetAmount = `$${formatNumber(group.totalBudget)}`;

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

    const props = {
      id,
      totalBalance,
      totalBudgetAmount,
      unpaidBalance,
      leftOverBalance,
      isOverBudget,
      isAlmostOverBudget,
      overdueExpenses,
      ...group,
    };

    return <ExpenseGroupLayout {...props} />;
  }

  return null;
};

export default ExpenseGroup;
