import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AUTHENTICATE_USER } from '../mutations';
import { useAppContext } from '../providers/AppProvider';

const useLogin = () => {
  const { setShowLoader } = useAppContext();
  const [error, setError] = useState();

  const [authenticateUser, { loading }] = useMutation(AUTHENTICATE_USER, {
    onError: (err) => setError(err.message),
    update: (cache, { data }) => {
      const { response } = data;

      if (response.error || !response.loggedIn) {
        setError('Invalid login');
      }
    },
  });

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  return { authenticateUser, error };
};

export default useLogin;
