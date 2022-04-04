import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import cookie from 'js-cookie';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LoginForm from '../../components/LoginForm';
import useLogin from '../../hooks/useLogin';
import { useAppContext } from '../../providers/AppProvider';

const Login = () => {
  const { loginUser, data, error } = useLogin();
  const { setLoggedIn } = useAppContext();
  const history = useHistory();

  const usernameRef = useRef();

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
    usernameRef?.current?.focus();
  }, [error, data?.response?.error]);

  useEffect(() => {
    if (data) {
      const { response } = data;

      if (response.error) {
        return;
      }

      cookie.set('userToken', response.token, { expires: 0.02, path: '/' });
      setLoggedIn(true);
      history.push('/expense-groups');
    }
  }, [data, history]);

  return (
    <LoginForm
      authError={error || data?.response?.error}
      {...formik}
      ref={usernameRef}
    />
  );
};

export default Login;
