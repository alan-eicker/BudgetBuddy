import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Alert } from '@atomikui/core';

const AlertMessage = ({ theme, text, isActive, onClose }) => (
  <div
    className={classnames('alert-message', {
      'is-active': isActive,
    })}
  >
    <Alert theme={theme} onClose={onClose}>
      {text}
    </Alert>
  </div>
);

AlertMessage.propTypes = {
  theme: PropTypes.oneOf(['dark', 'info', 'warning', 'error', 'success']),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isActive: PropTypes.bool,
  onClose: PropTypes.func,
};

AlertMessage.defaultProps = {
  theme: 'info',
  text: '',
  isActive: false,
  onClose: () => {},
};

export default AlertMessage;
