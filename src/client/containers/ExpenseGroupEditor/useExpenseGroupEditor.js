import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../../providers/AppProvider';
import { GET_EXPENSE_GROUP } from '../../queries';
import { UPDATE_EXPENSE_GROUP } from '../../mutations';

const useExpenseGroupEditor = () => {
  const { setShowLoader, setAlert } = useAppContext();
  const [variables, setVariables] = useState();
  const history = useHistory();

  const [updateExpenseGroup, { loading }] = useMutation(UPDATE_EXPENSE_GROUP, {
    variables,
    onError: (err) => setAlert({ type: 'error', message: err.message }),
    onCompleted: ({ response }) => {
      history.push(`/expense-groups/${response._id}`);
      setAlert({
        type: 'success',
        message: 'Expense group successfully updated',
      });
    },
    update: (cache, { data }) => {
      const { response } = data;

      if (response.error) {
        setAlert({ type: 'error', message: response.error });
      }

      cache.writeQuery({
        query: GET_EXPENSE_GROUP,
        data: {
          expenseGroup: response,
        },
      });
    },
  });

  const onUpdateExpenseGroup = (userInput) => {
    // __typename needs to be removed or graphql will throw 500 error
    const userInputCopy = { ...userInput };
    delete userInputCopy.__typename;

    const input = {
      ...userInputCopy,
      expenses: userInputCopy.expenses.map((expense) => {
        const expenseCopy = { ...expense };
        delete expenseCopy.__typename;
        return expenseCopy;
      }),
    };

    setVariables({ input });
  };

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  useEffect(() => {
    if (variables) {
      updateExpenseGroup(updateExpenseGroup);
    }
  }, [variables, updateExpenseGroup]);

  return { onUpdateExpenseGroup };
};

export default useExpenseGroupEditor;
