const ExpenseGroup = require('../mongoose/schemas');

const expenseGroups = [
  {
    _id: '1',
    title: 'March 1, 2022 - March 15, 2022',
    totalBudget: 5600,
    expenses: [
      {
        _id: '1',
        title: 'Mortgage',
        balance: 2319.78,
        dueDate: '2/1/2022',
        paid: false,
        note: 'First mortgage payment!',
      },
      {
        _id: '2',
        title: 'Credit Card',
        balance: 100,
        dueDate: '2/11/2022',
        paid: true,
      },
      {
        _id: '3',
        title: 'Groceries',
        balance: 400,
        paid: true,
      },
      {
        _id: '4',
        title: 'Gas',
        balance: 150,
        paid: false,
      },
      {
        _id: '5',
        title: 'College Funds',
        balance: 600,
        paid: false,
      },
      {
        _id: '6',
        title: 'Roth IRA',
        balance: 250,
        paid: true,
      },
    ],
  },
  {
    _id: '2',
    title: 'March 16, 2022 - March 31, 2022',
    totalBudget: 5450,
    expenses: [
      {
        _id: '1',
        title: 'Car Payment',
        balance: 359.48,
        dueDate: '3/1/2022',
        paid: false,
        note: 'First mortgage payment!',
      },
      {
        _id: '2',
        title: 'ComEd',
        balance: 119.89,
        dueDate: '3/15/2022',
        paid: true,
      },
    ],
  },
];

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
  previousAndNextGroups: ({ _id }) => {
    // 1. Find the index of the current ID
    // 2. If current ID is first, then return { isFirst: true, result: [{object}] }
    // 3. If current ID is last, then return { isLast: true, result: [{object}] }
    // 4. If current ID is not first or last, then return { result: [{object}, {object}] }
  },
};
