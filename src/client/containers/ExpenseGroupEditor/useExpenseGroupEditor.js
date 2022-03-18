import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, makeReference } from '@apollo/client';
import { useAppContext } from '../../providers/AppProvider';
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
          message: 'Expense group successfully added',
        });
      },
      update: (cache, { data }) => {
        const { response } = data;

        if (response.error) {
          setAlert({ type: 'error', message: response.error });
        }

        const cachedId = cache.identify(makeReference('ROOT_QUERY'));

        cache.modify({
          fields: {
            expenseGroups: (existingExpenseGroups, { toReference }) => [
              ...existingExpenseGroups,
              toReference(cachedId),
            ],
          },
        });
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

        cache.modify({
          id: cache.identify({ id: response._id, __typename: 'ExpenseGroup' }),
          fields: {
            expenseGroup() {
              return response;
            },
          },
        });
      },
    },
  );

  const onCreateExpenseGroup = (newExpenseGroup) => {
    createExpenseGroup({ variables: { input: newExpenseGroup } });
  };

  const onUpdateExpenseGroup = (expenseGroup) => {
    const input = removeTypename(expenseGroup);
    updateExpenseGroup({ variables: { input } });
  };

  useEffect(() => {
    setShowLoader(updateRequest.loading || createRequest.loading);
  }, [updateRequest, createRequest, setShowLoader]);

  return { onUpdateExpenseGroup, onCreateExpenseGroup };
};

export default useExpenseGroupEditor;
