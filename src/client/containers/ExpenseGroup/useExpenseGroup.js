import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useAppContext } from '../../AppProvider';
import { GET_EXPENSE_GROUP } from '../../queries';

const useExpenseGroup = () => {
  const { id } = useParams();
  const { setShowLoader } = useAppContext();

  const { loading, error, data } = useQuery(GET_EXPENSE_GROUP, {
    variables: {
      id,
    },
  });

  if (error) throw new Error(error);

  useEffect(() => {
    setShowLoader(loading);
  }, [loading]);

  return { data };
};

export default useExpenseGroup;
