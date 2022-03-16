import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useAppContext } from '../../providers/AppProvider';
import { GET_EXPENSE_GROUP } from '../../queries';

const useExpenseGroup = () => {
  const { id } = useParams();
  const { setShowLoader, setAlert } = useAppContext();

  const { loading, data } = useQuery(GET_EXPENSE_GROUP, {
    skip: !id,
    variables: {
      id,
    },
    onError: (err) => setAlert({ type: 'error', message: err.message }),
  });

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  return { data };
};

export default useExpenseGroup;
