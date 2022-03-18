import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Spinner, Alert } from '@atomikui/core';
import { useAppContext } from '../../providers/AppProvider';

const Layout = ({ header, subheader, children, isIndexPage, ...others }) => {
  const { showLoader, alert, setAlert } = useAppContext();

  return (
    <>
      <Overlay theme="white" isActive={showLoader}>
        <Spinner size="xlg" theme="teal" />
      </Overlay>
      <div className="layout" {...others}>
        <div className="layout__header">{header}</div>
        {subheader && (
          <div className="layout__subheader">
            <div className="layout__subheader__body">
              <div className="text-align-right">{subheader}</div>
            </div>
          </div>
        )}
        <div
          id="layout-body"
          className="layout__body"
          {...(isIndexPage && { style: { height: '100vh' } })}
        >
          {alert && (
            <div className="layout__alert">
              <Alert theme={alert.type} onClose={() => setAlert()}>
                {alert.message}
              </Alert>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  header: PropTypes.node,
  subheader: PropTypes.node,
  children: PropTypes.node,
  isIndexPage: PropTypes.bool,
};

Layout.defaultProps = {
  header: <></>,
  subheader: null,
  children: <></>,
  isIndexPage: false,
};

export default Layout;
