import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useAppContext } from '../../providers/AppProvider';
import { GET_EXPENSE_GROUP } from '../../queries';

const useExpenseGroup = () => {
  const { id } = useParams();
  const { setShowLoader, setError } = useAppContext();

  const { loading, data } = useQuery(GET_EXPENSE_GROUP, {
    variables: {
      id,
    },
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    setShowLoader(loading);
  }, [loading]);

  return { data };
};

export default useExpenseGroup;
