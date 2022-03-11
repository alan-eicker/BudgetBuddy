import { gql } from '@apollo/client';

export const UPDATE_PAID_STATUS = gql`
  mutation UpdatePaidStatus(
    $groupId: String!
    $expenseId: String!
    $paid: Boolean!
  ) {
    paidStatus: updatePaidStatus(
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
