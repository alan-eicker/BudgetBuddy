module.exports = `
  type Query {
    expenseGroups: [ExpenseGroup]
    expenseGroup(id: Int!): ExpenseGroup
  }
  type ExpenseGroup {
    id: Int
    title: String
    totalBudget: Int
    expenses: [Expense]
  }
  type Expense {
    id: Int
    title: String
    balance: Float
    dueDate: String
    isPaid: Int
    notes: String
  }
`;
