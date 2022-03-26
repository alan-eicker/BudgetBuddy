const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    expenseGroups: [ExpenseGroup]
    expenseGroup(_id: String!): ExpenseGroup
    login(username: String!, password: String!): User
  }
  type Mutation {
    updateExpenseGroup(input: ExpenseGroupInput!): ExpenseGroup
    createExpenseGroup(input: NewExpenseGroupInput!): ExpenseGroup
    deleteExpenseGroup(groupId: String!): DeleteExpenseGroupResponse
    updatePaidStatus(
      groupId: String!
      expenseId: String!
      paid: Boolean!
    ): UpdateExpenseResponse
    deleteExpense(groupId: String!, expenseId: String!): DeleteExpenseResponse
  }
  type User {
    username: String
    token: String
    error: String
  }
  type ExpenseGroup {
    _id: String
    title: String
    startDate: String
    endDate: String
    totalBudget: Int
    expenses: [Expense]
  }
  type Expense {
    _id: String
    title: String
    balance: Float
    dueDate: String
    paid: Boolean
    note: String
  }
  type UpdateExpenseResponse {
    groupId: String
    expenseId: String
    paid: Boolean
    error: String
  }
  type DeleteExpenseResponse {
    groupId: String
    expenseId: String
    error: String
  }
  type DeleteExpenseGroupResponse {
    groupId: String
  }
  input ExpenseGroupInput {
    _id: String
    title: String
    startDate: String
    endDate: String
    totalBudget: Int
    expenses: [ExpenseInput]
  }
  input ExpenseInput {
    _id: String
    title: String
    balance: Float
    dueDate: String
    paid: Boolean
    note: String
  }
  input NewExpenseGroupInput {
    startDate: String
    endDate: String
    totalBudget: Int
    expenses: [NewExpenseInput]
  }
  input NewExpenseInput {
    _id: String
    title: String
    balance: Float
    dueDate: String
    paid: Boolean
    note: String
  }
`;
