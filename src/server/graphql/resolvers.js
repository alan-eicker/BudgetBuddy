const ExpenseGroup = require('../mongoose/schemas');

module.exports = {
  expenseGroups: async () => {
    try {
      return await ExpenseGroup.find({});
    } catch (err) {
      return { error: err.message };
    }
  },
  expenseGroup: async ({ _id }) => {
    try {
      return await ExpenseGroup.findById({ _id });
    } catch (err) {
      return { error: err.message };
    }
  },
  updatePaidStatus: async ({ groupId, expenseId, paid }) => {
    try {
      const expenseGroup = await ExpenseGroup.findById({ _id: groupId });
      const expense = expenseGroup.expenses.id(expenseId);

      expense.set({ ...expense, paid });

      expenseGroup.save();

      return {
        groupId,
        expenseId,
        paid,
      };
    } catch (err) {
      return { error: err.message };
    }
  },
  deleteExpense: async ({ groupId, expenseId }) => {
    try {
      const expenseGroup = await ExpenseGroup.findById({ _id: groupId });
      const expense = expenseGroup.expenses.id(expenseId);

      expense.remove();

      expenseGroup.save();

      return { groupId, expenseId };
    } catch (err) {
      return { error: err.message };
    }
  },
  updateExpenseGroup: async ({ input }) => {
    const expenseGroup = await ExpenseGroup.findOneAndReplace(
      { _id: input._id },
      input,
      { returnNewDocument: false },
    );
    return input;
  },
  verifyToken: () => ({ isValid: true }),
  previousAndNextGroups: ({ _id }) => {
    // 1. Find the index of the current ID
    // 2. If current ID is first, then return { isFirst: true, result: [{object}] }
    // 3. If current ID is last, then return { isLast: true, result: [{object}] }
    // 4. If current ID is not first or last, then return { result: [{object}, {object}] }
  },
};
