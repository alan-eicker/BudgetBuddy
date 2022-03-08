import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useAppContext } from '../../AppProvider';

const UPDATE_PAID_STATUS = gql`
  mutation UpdatePaidStatus(
    $groupId: String!
    $expenseId: String!
    $paid: Boolean!
  ) {
    updatePaidStatus(groupId: $groupId, expenseId: $expenseId, paid: $paid) {
      groupId
      expenseId
      paid
    }
  }
`;

const useExpenseCard = () => {
  const groupId = useParams().id;
  const { setShowLoader } = useAppContext();

  const [variables, setVariables] = useState();

  const [updatePaidStatus, { error, loading }] = useMutation(
    UPDATE_PAID_STATUS,
    {
      variables,
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
