import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utilities/date';
import {
  getSubTotalFromCollection,
  getOverDueExpenses,
  formatNumber,
} from '../../utilities/numbers';

const ExpenseGroupsSummaryHero = ({ _id, startDate, endDate, expenses }) => {
  const title = `${formatDate(startDate)} - ${formatDate(endDate)}`;
  const balance = `$${formatNumber(
    getSubTotalFromCollection(expenses, 'balance'),
  )}`;

  const overdueExpenses = getOverDueExpenses(expenses);

  return (
    <Link className="expense-group-summary-hero" to={`/expense-groups/${_id}`}>
      <div className="expense-group-summary-hero__content">
        <div className="expense-group-summary-hero__body">
          <h1 className="expense-group-summary-hero__title">
            <svg
              className="expense-group-summary-hero__title__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
            >
              <defs />
              <title>Сalendar</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Сalendar">
                  <path d="M41.92 5H40V2.5a2.5 2.5 0 0 0-5 0V5H15V2.5a2.5 2.5 0 0 0-5 0V5H8.08A8.08 8.08 0 0 0 0 13.08v28.84A8.08 8.08 0 0 0 8.08 50h33.84A8.08 8.08 0 0 0 50 41.92V13.08A8.08 8.08 0 0 0 41.92 5zM45 41.92A3.08 3.08 0 0 1 41.92 45H8.08A3.08 3.08 0 0 1 5 41.92V13.08A3.08 3.08 0 0 1 8.08 10H10v2.5a2.5 2.5 0 0 0 5 0V10h20v2.5a2.5 2.5 0 0 0 5 0V10h1.92A3.08 3.08 0 0 1 45 13.08z" />
                  <circle cx="25" cy="25.5" r="2.5" />
                  <circle cx="25" cy="34.5" r="2.5" />
                  <circle cx="16" cy="34.5" r="2.5" />
                  <g>
                    <circle className="is-today" cx="34" cy="25.5" r="2.5" />
                    <circle className="cls-2" cx="34" cy="34.5" r="2.5" />
                  </g>
                </g>
              </g>
            </svg>
            <span>Your Current Expenses</span>
          </h1>
          <h2 className="expense-group-summary-hero__subtitle">{title}</h2>
          <div className="expense-group-summary-hero__balance">
            Total balance: {balance}
          </div>
          {overdueExpenses > 0 && (
            <div className="expense-group-summary-hero__overdue-tag">
              <Icon
                icon={faExclamationCircle}
                color="white"
                className="margin-right-4"
              />{' '}
              {overdueExpenses} overdue expense{overdueExpenses > 1 && 's'}
            </div>
          )}
        </div>
        <div className="expense-group-summary-hero__footer">
          <Icon icon={faChevronRight} size="2x" color="white" />
        </div>
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
