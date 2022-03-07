/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const withRouteGaurd = (Component) => (props) => {
  const history = useHistory();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!isValid) {
      history.push('/');
    }
  }, [isValid]);

  return isValid ? <Component {...props} /> : null;
};

export default withRouteGaurd;
