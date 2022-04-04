import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import BrandLogo from '../BrandLogo';

const Masthead = ({ children, appName, ...others }) => (
  <header className="masthead" {...others}>
    <div className="masthead__logo">
      <BrandLogo size="sm" withText={false} />
      <div className="masthead__app-name">{appName}</div>
    </div>
    <div className="masthead__utils">
      {Cookies.get('userToken') && (
        <ul className="masthead__nav">
          {React.Children.map(children, (child, idx) => (
            <li key={`nav-item-${idx + 1}`}>{child}</li>
          ))}
        </ul>
      )}
      <div className="masthead__date">{new Date().toDateString()}</div>
    </div>
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
