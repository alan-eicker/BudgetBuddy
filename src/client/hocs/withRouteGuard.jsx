/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useVerifyToken from '../hooks/useVerifyToken';
import { useAppContext } from '../AppProvider';

const withRouteGaurd = (Component) => (props) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const { isValid } = useVerifyToken();

  useEffect(() => {
    if (!isValid) {
      navigate('/');
    } else {
      setIsLoggedIn(true);
    }
  }, [isValid]);

  return isValid ? <Component {...props} /> : null;
};

export default withRouteGaurd;
