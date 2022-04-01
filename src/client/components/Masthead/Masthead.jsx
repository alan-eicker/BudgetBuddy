import React from 'react';
import PropTypes from 'prop-types';
import BrandLogo from '../BrandLogo';

const Masthead = ({ children, appName, ...others }) => (
  <header className="masthead" {...others}>
    <div className="masthead__logo">
      <BrandLogo size="sm" withText={false} />
      <div className="masthead__app-name">{appName}</div>
    </div>
    <ul className="masthead__nav">
      {React.Children.map(children, (child, idx) => (
        <li key={`nav-item-${idx + 1}`}>{child}</li>
      ))}
    </ul>
  </header>
);

Masthead.propTypes = {
  children: PropTypes.node,
  appName: PropTypes.string,
};

Masthead.defaultProps = {
  children: <></>,
  appName: '',
};

export default Masthead;
