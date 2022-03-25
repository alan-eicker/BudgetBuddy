const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ExpenseGroup = require('../mongoose/expenseGroupSchema');
const User = require('../mongoose/usersSchema');

module.exports = {
  login: async ({ username, password }) => {
    const loginErrorMessage = 'invalid user';
    const tokenExpiration = 1;

    const user = await User.findOne({ username });

    if (!user) {
      throw new Error(loginErrorMessage);
    }

    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
      throw new Error(loginErrorMessage);
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: `${tokenExpiration}h`,
    });

    return { username, token, tokenExpiration };
  },
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
  updateExpenseGroup: async ({ input }) => {
    try {
      await ExpenseGroup.findOneAndReplace({ _id: input._id }, input, {
        returnNewDocument: false,
      });
      return input;
    } catch (err) {
      return { error: err.message };
    }
  },
  createExpenseGroup: async ({ input }) => {
    try {
      const newExpenseGroup = new ExpenseGroup(input);
      newExpenseGroup.save();
      return newExpenseGroup;
    } catch (err) {
      return { error: err.message };
    }
  },
  deleteExpenseGroup: async ({ groupId }) => {
    try {
      await ExpenseGroup.deleteOne({ _id: groupId });
      return { groupId };
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
};
