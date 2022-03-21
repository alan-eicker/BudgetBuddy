import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTHENTICATE_USER } from '../mutations';
import { useAppContext } from '../providers/AppProvider';

const useLogin = () => {
  const history = useHistory();
  const { setShowLoader, setLoggedIn, destinationPath } = useAppContext();
  const [error, setError] = useState();

  const [authenticateUser, { loading }] = useMutation(AUTHENTICATE_USER, {
    onError: (err) => setError(err.message),
    update: (_, { data }) => {
      const { response } = data;

      if (response.error || !response.loggedIn) {
        setError('Invalid login');
      } else {
        setLoggedIn(true);
        history.push(
          destinationPath === '/' ? '/expense-groups' : destinationPath,
        );
      }
    },
  });

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  return { authenticateUser, error };
};

export default useLogin;
