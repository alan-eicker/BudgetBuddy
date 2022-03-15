import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../providers/AppProvider';
import { GET_EXPENSE_GROUP } from '../queries';
import { UPDATE_PAID_STATUS, DELETE_EXPENSE } from '../mutations';

const useExpense = () => {
  const groupId = useParams().id;
  const { setShowLoader, setError } = useAppContext();

  const [variables, setVariables] = useState();

  const [deleteExpense, deleteResponse] = useMutation(DELETE_EXPENSE, {
    variables,
    onError: (err) => setError(err.message),
    update: (cache, { data }) => {
      const { response } = data;

      if (response.error) {
        setError(response.error);
      }

      const {
        expenseGroup: { expenses, ...groupProps },
      } = cache.readQuery({
        query: GET_EXPENSE_GROUP,
        variables: {
          id: response.groupId,
        },
      });

      cache.writeQuery({
        query: GET_EXPENSE_GROUP,
        data: {
          expenseGroup: {
            ...groupProps,
            expenses: expenses.filter(
              (expense) => expense._id !== response.expenseId,
            ),
          },
        },
      });
    },
  });

  const [updatePaidStatus, updateResponse] = useMutation(UPDATE_PAID_STATUS, {
    variables,
    onError: (err) => setError(err.message),
    update: (cache, { data }) => {
      const { response } = data;

      if (response.error) {
        setError(response.error);
      }

      const {
        expenseGroup: { expenses, ...groupProps },
      } = cache.readQuery({
        query: GET_EXPENSE_GROUP,
        variables: {
          id: response.groupId,
        },
      });

      cache.writeQuery({
        query: GET_EXPENSE_GROUP,
        data: {
          expenseGroup: {
            ...groupProps,
            expenses: expenses.map((expense) =>
              expense._id === response.expenseId
                ? { ...expense, paid: response.paid }
                : expense,
            ),
          },
        },
      });
    },
  });

  const onDelete = (expenseId) => {
    setVariables({ groupId, expenseId });
  };

  const onPaidChange = (expenseId, paid) => {
    setVariables({ groupId, expenseId, paid });
  };

  useEffect(() => {
    if (variables) {
      if (typeof variables.paid !== 'undefined') {
        updatePaidStatus(variables);
      } else {
        deleteExpense(variables);
      }
    }
  }, [variables, updatePaidStatus, deleteExpense]);

  useEffect(() => {
    setShowLoader(updateResponse.loading || deleteResponse.loading);
  }, [updateResponse, deleteResponse, setShowLoader]);

  return { onDelete, onPaidChange };
};

export default useExpense;
