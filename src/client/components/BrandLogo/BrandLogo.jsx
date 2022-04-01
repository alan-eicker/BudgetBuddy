import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const BrandLogo = ({ size, withText }) => (
  <div
    className={classnames('brand-logo', {
      [`brand-logo--${size}`]: size,
    })}
  >
    <div className="brand-logo__icon">
      <div>B</div>
      <div>B</div>
    </div>
    {withText && <div className="brand-logo__text">Budget Buddy</div>}
  </div>
);

BrandLogo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  withText: PropTypes.bool,
};

BrandLogo.defaultProps = {
  size: 'md',
  withText: false,
};

export default BrandLogo;
