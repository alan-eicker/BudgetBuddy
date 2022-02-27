import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';

const ExpenseGroupControls = () => {
  const { id } = useParams();
  const isMediumDevice = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <div className="expense-group-controls">
      <Link to="/expense-group/1">
        <Icon icon={faAngleLeft} size="lg" />
        {isMediumDevice ? 'Feb 15, 2022 - Feb 28, 2022' : 'previous'}
      </Link>
      <div>|</div>
      <Link to="/expense-group/1">
        {isMediumDevice ? 'March 16, 2022 - March 31, 2022' : 'next'}
        <Icon icon={faAngleRight} size="lg" />
      </Link>
    </div>
  );
};

export default ExpenseGroupControls;
