import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useAppContext } from '../providers/AppProvider';
import { GET_EXPENSE_GROUP } from '../queries';
import { DELETE_EXPENSE_GROUP } from '../mutations';
import useExpenseGroupEditor from './useExpenseGroupEditor';

const useExpenseGroup = () => {
  const history = useHistory();
  const { id } = useParams();
  const { setShowLoader, setAlert } = useAppContext();
  const { onCreateExpenseGroup } = useExpenseGroupEditor();

  const expenseGroupRequest = useQuery(GET_EXPENSE_GROUP, {
    skip: !id,
    variables: {
      id,
    },
    onError: (err) => setAlert({ type: 'error', message: err.message }),
  });

  const [deleteExpenseGroup, deleteExpenseGroupRequest] = useMutation(
    DELETE_EXPENSE_GROUP,
    {
      onError: (err) => setAlert({ type: 'error', message: err.message }),
      onCompleted: () => history.push('/expense-groups'),
      update: (cache, { data }) => {
        const { response } = data;

        cache.evict({
          id: cache.identify({
            id: response.groupId,
            __typename: 'ExpenseGroup',
          }),
        });
      },
    },
  );

  const onDeleteExpenseGroup = (groupId) => {
    deleteExpenseGroup({ variables: { groupId } });
  };

  const onDuplicateExpenseGroup = (e, expenses, duplicateExpenseGroupData) => {
    e.preventDefault();

    const payload = {
      ...duplicateExpenseGroupData,
      totalBudget: Number(duplicateExpenseGroupData.totalBudget),
      expenses: expenses.map((expense) => {
        const expenseCopy = { ...expense };
        delete expenseCopy._id;
        delete expenseCopy.__typename;
        expenseCopy.paid = false;
        return expenseCopy;
      }),
    };

    onCreateExpenseGroup(payload);
  };

  useEffect(() => {
    setShowLoader(
      expenseGroupRequest.loading || deleteExpenseGroupRequest.loading,
    );
  }, [expenseGroupRequest, deleteExpenseGroupRequest, setShowLoader]);

  return {
    data: expenseGroupRequest.data,
    onDeleteExpenseGroup,
    onDuplicateExpenseGroup,
  };
};

export default useExpenseGroup;
