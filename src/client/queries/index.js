import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    response: login(username: $username, password: $password) {
      username
      token
      error
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
