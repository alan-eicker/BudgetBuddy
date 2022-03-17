import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../providers/AppProvider';
import { GET_EXPENSE_GROUP } from '../queries';
import { UPDATE_PAID_STATUS, DELETE_EXPENSE } from '../mutations';

const useExpense = () => {
  const groupId = useParams().id;
  const { setShowLoader, setAlert } = useAppContext();

  const [deleteExpense, deleteRequest] = useMutation(DELETE_EXPENSE, {
    onError: (err) => setAlert(err.message),
    update: (cache, { data }) => {
      const { response } = data;

      if (response.error) {
        setAlert({ type: 'error', message: response.error });
      }

      const normalizedId = cache.identify({
        id: response.expenseId,
        __typename: 'Expense',
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  const [updatePaidStatus, updateRequest] = useMutation(UPDATE_PAID_STATUS, {
    onError: (err) => setAlert(err.message),
    update: (cache, { data }) => {
      const { response } = data;

      if (response.error) {
        setAlert({ type: 'error', message: response.error });
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
    deleteExpense({ variables: { groupId, expenseId } });
  };

  const onPaidChange = (expenseId, paid) => {
    updatePaidStatus({ variables: { groupId, expenseId, paid } });
  };

  useEffect(() => {
    setShowLoader(updateRequest.loading || deleteRequest.loading);
  }, [updateRequest, deleteRequest, setShowLoader]);

  return { onDelete, onPaidChange };
};

export default useExpense;
