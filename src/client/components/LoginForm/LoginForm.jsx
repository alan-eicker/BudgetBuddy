import React from 'react';
import PropTypes from 'prop-types';
import { FormField, Button, Alert } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

const LoginForm = ({
  authError,
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
}) => (
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

LoginForm.propTypes = {
  authError: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  authError: '',
  values: {},
  errors: {},
  touched: {},
  handleChange: () => {},
  handleSubmit: () => {},
};

export default LoginForm;
