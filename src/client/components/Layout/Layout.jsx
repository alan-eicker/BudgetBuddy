import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Spinner } from '@atomikui/core';
import { useAppContent } from '../../AppProvider';

const Layout = ({ header, subheader, children, ...others }) => {
  const { showLoader } = useAppContent();

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
          className="layout__body"
          style={{
            height: subheader ? 'calc(100vh - 125px)' : 'calc(100vh - 65px)',
          }}
        >
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
};

Layout.defaultProps = {
  header: <></>,
  subheader: <></>,
  children: <></>,
};

export default Layout;
