import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../../providers/AppProvider';
import { GET_EXPENSE_GROUP } from '../../queries';
import { UPDATE_EXPENSE_GROUP, CREATE_EXPENSE_GROUP } from '../../mutations';
import { removeTypename } from '../../utilities/graphql';

const useExpenseGroupEditor = () => {
  const { setShowLoader, setAlert } = useAppContext();
  const history = useHistory();

  const [createExpenseGroup, createRequest] = useMutation(
    CREATE_EXPENSE_GROUP,
    {
      onError: (err) => setAlert({ type: 'error', message: err.message }),
      onCompleted: ({ response }) => {
        history.push(`/expense-groups/${response._id}`);
        setAlert({
          type: 'success',
          message: 'Expense group successfully updated',
        });
      },
      update: (cache, { data }) => {
        console.log(data);
      },
    },
  );

  const [updateExpenseGroup, updateRequest] = useMutation(
    UPDATE_EXPENSE_GROUP,
    {
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
    },
  );

  const onUpdateExpenseGroup = (expenseGroup) => {
    const input = removeTypename(expenseGroup);
    updateExpenseGroup({ variables: { input } });
  };

  useEffect(() => {
    setShowLoader(updateRequest.loading || createRequest.loading);
  }, [updateRequest, createRequest, setShowLoader]);

  return { onUpdateExpenseGroup };
};

export default useExpenseGroupEditor;
