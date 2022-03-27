import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useAppContext } from '../providers/AppProvider';
import { LOGIN } from '../queries';

const useLogin = () => {
  const [error, setError] = useState();
  const { setShowLoader } = useAppContext();

  const [loginUser, { loading, data }] = useLazyQuery(LOGIN, {
    onError: (err) => setError(err.message),
  });

  useEffect(() => setShowLoader(loading), [loading, setShowLoader]);

  return { loginUser, data, error };
};

export default useLogin;
