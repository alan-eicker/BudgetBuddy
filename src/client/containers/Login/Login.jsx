import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LoginForm from '../../components/LoginForm';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const { authenticateUser, error } = useLogin();

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
    onSubmit: (formValues) =>
      authenticateUser({ variables: { input: formValues } }),
  });

  return <LoginForm authError={error} {...formik} />;
};

export default Login;
