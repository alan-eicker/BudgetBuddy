import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormField, Button, Alert } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

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

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formValues) => {
      console.log(formValues);
    },
  });

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <div className="login__title">Budget Buddy</div>
        {authError && (
          <Alert theme="error" className="margin-bottom-8">
            {authError}
          </Alert>
        )}
        <Grid className="login__fields">
          <Row>
            <Col md={12}>
              <FormField
                name="username"
                label="username"
                autocomplete="off"
                onChange={handleChange}
                value={values.username}
                hasError={!!(errors.username && touched.username)}
                errorText={errors.username}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormField
                name="password"
                label="password"
                autocomplete="off"
                onChange={handleChange}
                value={values.password}
                hasError={!!(errors.password && touched.password)}
                errorText={errors.password}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button type="submit" shape="pill" theme="teal" block>
                Login
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
