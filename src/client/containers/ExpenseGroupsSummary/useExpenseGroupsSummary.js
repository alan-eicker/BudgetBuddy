import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useAppContext } from '../../AppProvider';
import { GET_EXPENSE_GROUPS_PREVIEW } from '../../queries';

const useAllExpenseGroups = () => {
  const { setShowLoader } = useAppContext();
  const { loading, error, data } = useQuery(GET_EXPENSE_GROUPS_PREVIEW);

  if (error) throw new Error(error);

  useEffect(() => {
    setShowLoader(loading);
  }, [loading]);

  return { data };
};

export default useAllExpenseGroups;
