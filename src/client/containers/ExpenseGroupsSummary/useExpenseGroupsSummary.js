import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useAppContext } from '../../providers/AppProvider';
import { GET_EXPENSE_GROUPS_PREVIEW } from '../../queries';

const useAllExpenseGroups = () => {
  const { setShowLoader, setAlert } = useAppContext();
  const { loading, data } = useQuery(GET_EXPENSE_GROUPS_PREVIEW, {
    onError: (err) => setAlert({ type: 'error', message: err.message }),
  });

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  return { data };
};

export default useAllExpenseGroups;
