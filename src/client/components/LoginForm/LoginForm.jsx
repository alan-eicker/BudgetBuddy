import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FormField, Button } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BrandLogo from '../BrandLogo';

const LoginForm = forwardRef(
  ({ authError, values, errors, touched, handleChange, handleSubmit }, ref) => (
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
                ref={ref}
                name="username"
                placeholder="username"
                aria-label="username"
                onChange={handleChange}
                defaultValue={values.username}
                hasError={!!(errors.username && touched.username)}
                errorText={errors.username}
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormField
                type="password"
                name="password"
                aria-label="password"
                placeholder="password"
                onChange={handleChange}
                defaultValue={values.password}
                hasError={!!(errors.password && touched.password)}
                errorText={errors.password}
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button type="submit" shape="pill" theme="yellow" block>
                Login
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    </div>
  ),
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

LoginForm.displayName = 'LoginForm';

export default LoginForm;
