import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../../AppProvider';
import { GET_EXPENSE_GROUP } from '../../queries';
import { UPDATE_PAID_STATUS } from '../../mutations';

const useExpenseCard = () => {
  const groupId = useParams().id;
  const { setShowLoader } = useAppContext();

  const [variables, setVariables] = useState();

  const [updatePaidStatus, { error, loading }] = useMutation(
    UPDATE_PAID_STATUS,
    {
      variables,
      update: (cache, { data }) => {
        const { paidStatus } = data;

        if (paidStatus.error) {
          return;
        }

        const {
          expenseGroup: { expenses, ...groupProps },
        } = cache.readQuery({
          query: GET_EXPENSE_GROUP,
          variables: {
            id: paidStatus.groupId,
          },
        });

        cache.writeQuery({
          query: GET_EXPENSE_GROUP,
          data: {
            expenseGroup: {
              ...groupProps,
              expenses: expenses.map((expense) =>
                expense._id === paidStatus.expenseId
                  ? { ...expense, paid: paidStatus.paid }
                  : expense,
              ),
            },
          },
        });
      },
    },
  );

  const onPaidChange = (expenseId, paid) => {
    setVariables({ groupId, expenseId, paid });
  };

  if (error) throw new Error(error);

  useEffect(() => {
    if (variables) {
      updatePaidStatus(variables);
    }
  }, [variables]);

  useEffect(() => {
    setShowLoader(loading);
  }, [loading]);

  return { onPaidChange };
};

export default useExpenseCard;
