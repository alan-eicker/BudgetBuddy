import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utilities/date';
import {
  getSubTotalFromCollection,
  formatNumber,
} from '../../utilities/numbers';

const ExpenseGroupsSummaryHero = ({ _id, startDate, endDate, expenses }) => {
  const title = `${formatDate(startDate)} - ${formatDate(endDate)}`;
  const balance = `$${formatNumber(
    getSubTotalFromCollection(expenses, 'balance'),
  )}`;

  return (
    <Link className="expense-group-summary-hero" to={`/expense-groups/${_id}`}>
      <div className="expense-group-summary-hero__body">
        <h1 className="expense-group-summary-hero__title">
          Your Current Expenses
        </h1>
        <h2 className="expense-group-summary-hero__subtitle">{title}</h2>
        <div className="expense-group-summary-hero__balance">{balance}</div>
      </div>
      <div className="expense-group-summary-hero__footer">
        <Icon icon={faChevronRight} size="2x" color="white" />
      </div>
    </Link>
  );
};

ExpenseGroupsSummaryHero.propTypes = {
  _id: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  expenses: PropTypes.array,
};

ExpenseGroupsSummaryHero.defaultProps = {
  _id: '',
  startDate: '',
  endDate: '',
  expenses: [],
};

export default ExpenseGroupsSummaryHero;
