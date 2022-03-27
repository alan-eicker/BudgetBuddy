import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cookie from 'js-cookie';
import * as yup from 'yup';
import { useLazyQuery } from '@apollo/client';
import { useFormik } from 'formik';
import LoginForm from '../../components/LoginForm';
import { LOGIN } from '../../queries';
import { useAppContext } from '../../providers/AppProvider';

const Login = () => {
  const [authError, setAuthError] = useState();
  const { setShowLoader } = useAppContext();
  const history = useHistory();

  const [loginUser, { loading, data }] = useLazyQuery(LOGIN, {
    onError: (err) => setAuthError(err.message),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formValues) => {
      loginUser({ variables: formValues });
    },
  });

  useEffect(() => {
    if (data) {
      const {
        response: { token, error },
      } = data;

      if (error) {
        return setAuthError(error);
      }

      cookie.set('userToken', token, { expires: 0.02, path: '/' });
      history.push('/expense-groups');
    }
  }, [data, history]);

  useEffect(() => setShowLoader(loading), [loading]);

  return <LoginForm authError={authError} {...formik} />;
};

export default Login;
