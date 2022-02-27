import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Spinner } from '@atomikui/core';
import { useAppContent } from '../../AppProvider';

const Layout = ({ header, children, ...others }) => {
  const { showLoader } = useAppContent();

  return (
    <>
      <Overlay theme="white" isActive={showLoader}>
        <Spinner size="xlg" theme="teal" />
      </Overlay>
      <div className="layout" {...others}>
        <div className="layout__header">{header}</div>
        <div className="layout__body">{children}</div>
      </div>
    </>
  );
};

Layout.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
};

Layout.defaultProps = {
  header: <></>,
  children: <></>,
};

export default Layout;
