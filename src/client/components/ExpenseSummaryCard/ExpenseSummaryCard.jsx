import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const ExpenseSummaryCard = ({ title, balance, overdueExpenses }) => (
  <div
    className={classnames('expense-group-summary-card', {
      'has-overdue-expense': !!overdueExpenses,
    })}
  >
    <div className="expense-group-summary-card__body">
      <div className="expense-group-summary-card__title">
        <div>{title}</div>
        {!!overdueExpenses && (
          <div className="expense-group-summary-card__tag">
            <Icon
              icon={faExclamationCircle}
              size="xl"
              className="margin-bottom-4"
            />
            <br />
            {overdueExpenses} overdue
          </div>
        )}
      </div>
      <div className="expense-group-summary-card__subtitle">
        Total budget:
        <br /> {balance}
      </div>
    </div>
    <div className="expense-group-summary-card__footer">
      <Icon icon={faChevronRight} size="xl" />
    </div>
  </div>
);

ExpenseSummaryCard.propTypes = {
  title: PropTypes.string,
  balance: PropTypes.string,
  overdueExpenses: PropTypes.number,
};

ExpenseSummaryCard.defaultProps = {
  title: '',
  balance: '$0.00',
  overdueExpenses: 0,
};

export default ExpenseSummaryCard;
