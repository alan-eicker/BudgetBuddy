/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const withRouteGaurd = (Component) => (props) => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!isValid) {
      navigate('/');
    }
  }, [isValid]);

  return isValid ? <Component {...props} /> : null;
};

export default withRouteGaurd;
