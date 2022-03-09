import { gql } from '@apollo/client';

export const GET_EXPENSE_GROUPS_PREVIEW = gql`
  query ExpenseGroups {
    expenseGroups {
      _id
      startDate
      endDate
      totalBudget
      expenses {
        balance
        dueDate
        paid
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
