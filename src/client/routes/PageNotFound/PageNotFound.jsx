import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@atomikui/core';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <div className="page-not-found__body">
        <div className="page-not-found__title">404</div>
        <div className="page-not-found__subtitle">Page Not Found</div>
        <Button
          theme="white"
          shape="pill"
          size="lg"
          onClick={() => navigate(-1)}
        >
          go back
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
