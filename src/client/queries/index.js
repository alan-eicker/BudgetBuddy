import { gql } from '@apollo/client';

export const AUTHENTICATE_USER = `
  query AuthenticateUser() {
    response: login() {
      username
      token
      tokenExpiration
    }
  }
`;

export const GET_EXPENSE_GROUPS = gql`
  query ExpenseGroups {
    expenseGroups {
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

export const GET_EXPENSE_GROUP = gql`
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
