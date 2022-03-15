import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../../providers/AppProvider';
import { UPDATE_EXPENSE_GROUP } from '../../mutations';

const useExpenseGroupEditor = () => {
  const { setShowLoader, setError } = useAppContext();
  const [variables, setVariables] = useState();

  const [updateExpenseGroup, { loading }] = useMutation(UPDATE_EXPENSE_GROUP, {
    variables,
    onError: (err) => setError(err.message),
    update: (cache, { data }) => {
      const { response } = data;
      console.log(response);
    },
  });

  const onUpdateExpenseGroup = (userInput) => {
    setVariables({ input: userInput });
  };

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  useEffect(() => {
    if (variables) {
      updateExpenseGroup(updateExpenseGroup);
    }
  }, [variables, updateExpenseGroup]);

  return { onUpdateExpenseGroup };
};

export default useExpenseGroupEditor;
