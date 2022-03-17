import { gql } from '@apollo/client';

export const CREATE_EXPENSE_GROUP = gql`
  mutation CreateExpenseGroup($input: NewExpenseGroupInput!) {
    response: createExpenseGroup(input: $input) {
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

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($groupId: String!, $expenseId: String!) {
    response: deleteExpense(groupId: $groupId, expenseId: $expenseId) {
      groupId
      expenseId
      error
    }
  }
`;

export const UPDATE_EXPENSE_GROUP = gql`
  mutation UpdateExpenseGroup($input: ExpenseGroupInput!) {
    response: updateExpenseGroup(input: $input) {
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

export const UPDATE_PAID_STATUS = gql`
  mutation UpdatePaidStatus(
    $groupId: String!
    $expenseId: String!
    $paid: Boolean!
  ) {
    response: updatePaidStatus(
      groupId: $groupId
      expenseId: $expenseId
      paid: $paid
    ) {
      groupId
      expenseId
      paid
      error
    }
  }
`;
