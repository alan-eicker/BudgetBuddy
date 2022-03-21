import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { LOGOUT_USER } from '../mutations';
import { useAppContext } from '../providers/AppProvider';

const useLogout = () => {
  const history = useHistory();
  const { setLoggedIn, setDestinationPath } = useAppContext();

  // Replace with logout mutation
  const logoutUser = () => {
    setDestinationPath('/');
    setLoggedIn(false);
  };

  // useEffect(() => {
  //   setShowLoader(loading);
  // }, [loading, setShowLoader]);

  return { logoutUser };
};

export default useLogout;
