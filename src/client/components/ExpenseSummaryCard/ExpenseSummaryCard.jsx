import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const ExpenseSummaryCard = ({ id, title, balance, overdueExpenses }) => (
  <Link
    to={`/expense-groups/${id}`}
    className={classnames('expense-group-summary-card', {
      'has-overdue-expense': !!overdueExpenses,
    })}
  >
    <div className="expense-group-summary-card__body">
      <div className="expense-group-summary-card__title">
        {!!overdueExpenses && (
          <div className="expense-group-summary-card__tag">
            <Icon
              icon={faExclamationCircle}
              size="xl"
              className="margin-bottom-4"
            />
            <span>
              {overdueExpenses} overdue expense{overdueExpenses > 1 && 's'}
            </span>
          </div>
        )}
        {title}
      </div>
      <div className="expense-group-summary-card__subtitle">
        Total budget:
        <br /> {balance}
      </div>
    </div>
    <div className="expense-group-summary-card__footer">
      <Icon icon={faChevronRight} size="xl" />
    </div>
  </Link>
);

ExpenseSummaryCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  balance: PropTypes.string,
  overdueExpenses: PropTypes.number,
};

ExpenseSummaryCard.defaultProps = {
  id: '',
  title: '',
  balance: '$0.00',
  overdueExpenses: 0,
};

export default ExpenseSummaryCard;
