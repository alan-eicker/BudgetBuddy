module.exports = `
  type Query {
    expenseGroups: [ExpenseGroup]
    expenseGroup(_id: String!): ExpenseGroup
    verifyToken: TokenStatus
  }
  type Mutation {
    updatePaidStatus(
      groupId: String!,
      expenseId: String!, 
      paid: Boolean!
    ): UpdateExpenseResponse
    updateExpenseGroup(input: ExpenseGroupInput!): ExpenseGroup
    deleteExpense(
      groupId: String!,
      expenseId: String!
    ): DeleteExpenseResponse
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
  type TokenStatus {
    isValid: Boolean
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
`;
