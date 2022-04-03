import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button, ButtonControls } from '@atomikui/core';

const ConfirmationSlider = ({ isActive, title, onCancel, onConfirm }) => (
  <div
    className={classnames('confirmation-slider', {
      'is-active': isActive,
    })}
  >
    <div className="text-size-20">{title}</div>
    <ButtonControls>
      <Button
        {...(!isActive && { tabIndex: '-1' })}
        shape="pill"
        theme="lime"
        size="md"
        onClick={onConfirm}
      >
        delete
      </Button>
      <Button
        {...(!isActive && { tabIndex: '-1' })}
        shape="pill"
        theme="white"
        size="md"
        onClick={onCancel}
      >
        cancel
      </Button>
    </ButtonControls>
  </div>
);

ConfirmationSlider.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

ConfirmationSlider.defaultProps = {
  isActive: false,
  title: 'Are you sure?',
  onCancel: () => {},
  onConfirm: () => {},
};

export default ConfirmationSlider;
