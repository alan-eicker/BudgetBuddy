module.exports = `
  type Query {
    expenseGroups: [ExpenseGroup]
    expenseGroup(_id: String!): ExpenseGroup
  }
  type ExpenseGroup {
    _id: String
    title: String
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
`;
