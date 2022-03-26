const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const ExpenseGroup = require('../mongoose/expenseGroupSchema');
const User = require('../mongoose/usersSchema');

const hasValidToken = (token) => {
  console.log(token);
  if (!token) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in',
    );
  }
};

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
          expiresIn: `1h`,
        });

        return { username, token };
      } catch (err) {
        return { error: err.message };
      }
    },
    expenseGroups: async (root, args, context) => {
      hasValidToken(context.token);

      try {
        return await ExpenseGroup.find({});
      } catch (err) {
        return { error: err.message };
      }
    },
    expenseGroup: async (root, { _id }) => {
      try {
        return await ExpenseGroup.findById({ _id });
      } catch (err) {
        return { error: err.message };
      }
    },
  },
  Mutation: {
    updateExpenseGroup: async (root, { input }) => {
      try {
        await ExpenseGroup.findOneAndReplace({ _id: input._id }, input, {
          returnNewDocument: false,
        });
        return input;
      } catch (err) {
        return { error: err.message };
      }
    },
    createExpenseGroup: async (root, { input }) => {
      try {
        const newExpenseGroup = new ExpenseGroup(input);
        newExpenseGroup.save();
        return newExpenseGroup;
      } catch (err) {
        return { error: err.message };
      }
    },
    deleteExpenseGroup: async (root, { groupId }) => {
      try {
        await ExpenseGroup.deleteOne({ _id: groupId });
        return { groupId };
      } catch (err) {
        return { error: err.message };
      }
    },
    updatePaidStatus: async (root, { groupId, expenseId, paid }) => {
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
    deleteExpense: async (root, { groupId, expenseId }) => {
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
