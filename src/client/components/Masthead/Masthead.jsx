import React from 'react';
import PropTypes from 'prop-types';

const Masthead = ({ nav, appName, ...others }) => (
  <header className="masthead" {...others}>
    <div className="masthead__logo">{appName}</div>
    <ul className="masthead__nav">
      {nav.map((link, index) => (
        <li key={`nav-item-${index + 1}`}>{link}</li>
      ))}
    </ul>
  </header>
);

Masthead.propTypes = {
  nav: PropTypes.arrayOf(PropTypes.node),
  appName: PropTypes.string,
};

Masthead.defaultProps = {
  nav: [],
  appName: '',
};

export default Masthead;
