// TODO: Refactor into recursive function so it
// is not specific to only expense groups
export const removeTypename = (data) => {
  const dataCopy = { ...data };
  delete dataCopy.__typename;

  return {
    ...dataCopy,
    expenses: dataCopy.expenses.map((expense) => {
      const expenseCopy = { ...expense };
      delete expenseCopy.__typename;
      return expenseCopy;
    }),
  };
};
