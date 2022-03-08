module.exports = `
  type Query {
    expenseGroups: [ExpenseGroup]
    expenseGroup(_id: String!): ExpenseGroup
    verifyToken: TokenStatus
  }
  type Mutation {
    updatePaidStatus(groupId: String!, expenseId: String!, paid: Boolean!): Expense
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
  type paymentStatus {
    groupId: String
    expenseId: String
    paid: Boolean
  }
  type TokenStatus {
    isValid: Boolean
  }
`;
