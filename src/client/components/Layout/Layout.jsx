import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ header, children, ...others }) => (
  <div className="layout" {...others}>
    <div className="layout__header">{header}</div>
    <div className="layout__body">{children}</div>
  </div>
);

Layout.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
};

Layout.defaultProps = {
  header: <></>,
  children: <></>,
};

export default Layout;
