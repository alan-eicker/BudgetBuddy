import React from 'react';
import PropTypes from 'prop-types';
import { FormField, Button } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BrandLogo from '../BrandLogo';

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
      <h1 className="login__title" aria-label="budget buddy">
        <BrandLogo size="lg" textLeft />
      </h1>

      <Grid className="login__fields">
        <Row>
          {authError && (
            <Col md={12}>
              <div className="login__error">{authError}</div>
            </Col>
          )}
          <Col md={12}>
            <FormField
              name="username"
              placeholder="username"
              ariaLable="username"
              autoComplete="off"
              onChange={handleChange}
              defaultValue={values.username}
              hasError={!!(errors.username && touched.username)}
              errorText={errors.username}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormField
              type="password"
              name="password"
              ariaLabel="password"
              placeholder="password"
              autocomplete="off"
              onChange={handleChange}
              defaultValue={values.password}
              hasError={!!(errors.password && touched.password)}
              errorText={errors.password}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button type="submit" shape="pill" theme="lime" block>
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
