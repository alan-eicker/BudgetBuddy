const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utilities/verifyToken');
const ExpenseGroup = require('../mongodb/expenseGroupSchema');
const User = require('../mongodb/usersSchema');

module.exports = {
  Query: {
    login: async (root, { username, password }) => {
      try {
        const loginErrorMessage = 'invalid user';

        const user = await User.findOne({ username });

        if (!user) {
          throw new Error(loginErrorMessage);
        }

        const isValidUser = await bcrypt.compare(password, user.password);

        if (!isValidUser) {
          throw new Error(loginErrorMessage);
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: `30m`,
        });

        return { username, token };
      } catch (err) {
        return { error: err.message };
      }
    },
    expenseGroups: async (root, args, context) => {
      verifyToken(context.token);

      try {
        return await ExpenseGroup.find({});
      } catch (err) {
        return { error: err.message };
      }
    },
    expenseGroup: async (root, { _id }, context) => {
      verifyToken(context.token);

      try {
        return await ExpenseGroup.findById({ _id });
      } catch (err) {
        return { error: err.message };
      }
    },
  },
  Mutation: {
    updateExpenseGroup: async (root, { input }, context) => {
      verifyToken(context.token);

      try {
        await ExpenseGroup.findOneAndReplace({ _id: input._id }, input, {
          returnNewDocument: false,
        });
        return input;
      } catch (err) {
        return { error: err.message };
      }
    },
    createExpenseGroup: async (root, { input }, context) => {
      verifyToken(context.token);

      try {
        const newExpenseGroup = new ExpenseGroup(input);
        newExpenseGroup.save();
        return newExpenseGroup;
      } catch (err) {
        return { error: err.message };
      }
    },
    deleteExpenseGroup: async (root, { groupId }, context) => {
      verifyToken(context.token);

      try {
        await ExpenseGroup.deleteOne({ _id: groupId });
        return { groupId };
      } catch (err) {
        return { error: err.message };
      }
    },
    updatePaidStatus: async (root, { groupId, expenseId, paid }, context) => {
      verifyToken(context.token);

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
    deleteExpense: async (root, { groupId, expenseId }, context) => {
      verifyToken(context.token);

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
  },
};
