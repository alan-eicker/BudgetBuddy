const ExpenseGroup = require('../mongoose/schemas');

module.exports = {
  expenseGroups: async () => {
    try {
      return await ExpenseGroup.find({});
    } catch (err) {
      return { err: err.message };
    }
  },
  expenseGroup: async ({ _id }) => {
    try {
      return await ExpenseGroup.findById({ _id });
    } catch (err) {
      return { err: err.message };
    }
  },
  updatePaidStatus: async ({ groupId, expenseId, paid }) => {
    console.log(groupId);
    console.log(expenseId);
    console.log(paid);

    return { groupId, expenseId, paid };
  },
  verifyToken: () => ({ isValid: true }),
  previousAndNextGroups: ({ _id }) => {
    // 1. Find the index of the current ID
    // 2. If current ID is first, then return { isFirst: true, result: [{object}] }
    // 3. If current ID is last, then return { isLast: true, result: [{object}] }
    // 4. If current ID is not first or last, then return { result: [{object}, {object}] }
  },
};
