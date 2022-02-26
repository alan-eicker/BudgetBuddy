import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ExpenseGroupControls = () => {
  const { id } = useParams();

  return (
    <div className="expense-group-controls">
      <Link to="/expense-group/1">
        <Icon icon={faAngleLeft} size="lg" />
        Feb 15, 2022 - Feb 28, 2022
      </Link>
      <div>|</div>
      <Link to="/expense-group/1">
        March 16, 2022 - March 31, 2022
        <Icon icon={faAngleRight} size="lg" />
      </Link>
    </div>
  );
};

export default ExpenseGroupControls;
