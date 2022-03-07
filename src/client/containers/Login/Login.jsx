import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  const [authError, setAuthError] = useState();

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
      console.log(formValues);
    },
  });

  return <LoginForm authError={authError} {...formik} />;
};

export default Login;
