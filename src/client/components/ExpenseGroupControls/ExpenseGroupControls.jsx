import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ExpenseGroupControls = () => (
  <div className="expense-group-controls">
    <Link to="">
      <Icon icon={faAngleLeft} size="lg" />
      Feb 15, 2022 - Feb 28, 2022
    </Link>
    <div>|</div>
    <Link to="">
      March 16, 2022 - March 31, 2022
      <Icon icon={faAngleRight} size="lg" />
    </Link>
  </div>
);

export default ExpenseGroupControls;
