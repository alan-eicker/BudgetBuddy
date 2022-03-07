import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@atomikui/core';

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="page-not-found">
      <div className="page-not-found__body">
        <div className="page-not-found__title">404</div>
        <div className="page-not-found__subtitle">Page Not Found</div>
        <Button
          theme="indigo"
          shape="pill"
          size="lg"
          onClick={() => history.goBack()}
        >
          go back
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
