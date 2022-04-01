import React from 'react';
import PropTypes from 'prop-types';

const sizes = {
  sm: '36',
  md: '80',
  lg: '120',
};

const BrandLogo = ({ size, withText }) => (
  <div className="brand-logo">
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 216.000000 270.000000"
      preserveAspectRatio="xMidYMid meet"
      width={sizes[size]}
      height={sizes[size]}
    >
      <g
        transform="translate(0.000000,270.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M888 2525 c-184 -30 -396 -123 -544 -238 l-79 -62 407 -3 c225 -1
591 -1 815 0 l408 3 -79 61 c-133 105 -307 187 -476 225 -114 26 -336 33 -452
14z"
        />
        <path
          fill="#f44336"
          d="M224 1780 c-27 -11 -72 -65 -80 -97 -10 -37 11 -95 46 -128 l31 -30
270 -3 269 -3 0 136 0 135 -257 -1 c-142 0 -267 -4 -279 -9z"
        />
        <path
          fill="#f9a825"
          d="M1390 1655 l0 -135 260 0 c289 0 304 3 340 63 40 64 15 158 -49 192
-25 12 -75 15 -291 15 l-260 0 0 -135z"
        />
        <path
          fill="#ffee58"
          d="M224 1080 c-30 -12 -71 -64 -79 -100 -9 -41 9 -91 46 -126 l30 -29
270 -3 269 -3 0 136 0 135 -257 -1 c-142 0 -267 -4 -279 -9z"
        />
        <path
          fill="#26c6da"
          d="M1390 955 l0 -135 260 0 c216 0 266 3 291 15 65 34 89 128 49 193
-35 58 -60 62 -345 62 l-255 0 0 -135z"
        />
        <path
          d="M395 354 c74 -53 258 -140 355 -168 340 -97 734 -31 1017 170 l48 34
-735 0 -735 0 50 -36z"
        />
      </g>
    </svg>

    {withText && <div className="brand-logo__text">Budget Buddy</div>}
  </div>
);

BrandLogo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  withText: PropTypes.bool,
};

BrandLogo.defaultProps = {
  size: 'md',
  withText: true,
};

export default BrandLogo;
