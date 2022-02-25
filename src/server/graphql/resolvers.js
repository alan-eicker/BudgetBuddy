const expenseGroups = [
  {
    id: 1,
    title: 'March 1, 2022 - March 15, 2022',
    totalBudget: 5600,
    expenses: [
      {
        id: 1,
        name: 'Mortgage',
        balance: 2319.78,
        dueDate: '2/1/2022',
        isPaid: 0,
        notes: 'First mortgage payment!',
      },
      {
        id: 2,
        name: 'Credit Card',
        balance: 100,
        dueDate: '2/11/2022',
        isPaid: 1,
      },
      {
        id: 3,
        name: 'Groceries',
        balance: 400,
        dueDate: '2/13/2022',
        isPaid: 1,
      },
    ],
  },
];

module.exports = {
  expenseGroups: () => expenseGroups,
  expenseGroup: ({ id }) => {
    console.log(expenseGroups.find((group) => group.id === id));
    return expenseGroups.find((group) => group.id === id);
  },
};
