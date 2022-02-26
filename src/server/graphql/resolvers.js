const expenseGroups = [
  {
    id: 1,
    title: 'March 1, 2022 - March 15, 2022',
    totalBudget: 5600,
    expenses: [
      {
        id: 1,
        title: 'Mortgage',
        balance: 2319.78,
        dueDate: '2/1/2022',
        isPaid: 0,
        notes: 'First mortgage payment!',
      },
      {
        id: 2,
        title: 'Credit Card',
        balance: 100,
        dueDate: '2/11/2022',
        isPaid: 1,
      },
      {
        id: 3,
        title: 'Groceries',
        balance: 400,
        isPaid: 1,
      },
      {
        id: 4,
        title: 'Gas',
        balance: 150,
        isPaid: 0,
      },
      {
        id: 5,
        title: 'College Funds',
        balance: 600,
        isPaid: 0,
      },
      {
        id: 6,
        title: 'Roth IRA',
        balance: 250,
        isPaid: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'March 16, 2022 - March 31, 2022',
    totalBudget: 5450,
    expenses: [
      {
        id: 1,
        title: 'Car Payment',
        balance: 359.48,
        dueDate: '3/1/2022',
        isPaid: 0,
        notes: 'First mortgage payment!',
      },
      {
        id: 2,
        title: 'ComEd',
        balance: 119.89,
        dueDate: '3/15/2022',
        isPaid: 0,
      },
    ],
  },
];

module.exports = {
  expenseGroups: () => expenseGroups,
  expenseGroup: ({ id }) => expenseGroups.find((group) => group.id === id),
  previousAndNextGroups: ({ id }) => {
    // 1. Find the index of the current ID
    // 2. If current ID is first, then return { isFirst: true, result: [{object}] }
    // 3. If current ID is last, then return { isLast: true, result: [{object}] }
    // 4. If current ID is not first or last, then return { result: [{object}, {object}] }
  },
};
