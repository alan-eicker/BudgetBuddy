import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utilities/date';

const ExpenseGroupControls = () => {
  const { id } = useParams();

  return (
    <div className="expense-group-controls">
      <Link to="/expense-group/1">
        <Icon icon={faAngleLeft} size="lg" />
        03/01/2022
      </Link>
      <div>|</div>
      <Link to="/expense-group/1">
        03/15/2022
        <Icon icon={faAngleRight} size="lg" />
      </Link>
    </div>
  );
};

export default ExpenseGroupControls;
