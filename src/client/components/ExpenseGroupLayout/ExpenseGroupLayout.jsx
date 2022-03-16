import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonControls, Button, Statistic, Hint, Alert } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faPen,
  faTimes,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utilities/date';
import { formatNumber } from '../../utilities/numbers';
import ExpenseList from '../ExpenseList';

const ExpenseGroupLayout = ({
  id,
  expenses,
  totalBudget,
  totalBalance,
  isAlmostOverBudget,
  isOverBudget,
  leftOverBalance,
  unpaidBalance,
  overdueExpenses,
  budgetLimitPercentage,
  startDate,
  endDate,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(overdueExpenses > 0);
  }, [overdueExpenses]);

  return (
    <div className="expense-group">
      <div className="expense-group__head">
        <h1 className="expense-group__title">
          {formatDate(startDate)} - {formatDate(endDate)}
          <span>Total Budget: ${formatNumber(totalBudget)}</span>
        </h1>
        <ButtonControls className="expense-group__controls">
          <Link title="go back" aria-label="go back" to="/expense-groups">
            <Icon icon={faArrowLeft} size="lg" />
          </Link>
          <Link
            title="edit expense"
            aria-label="edit expense"
            to={`/expense-groups/edit/${id}`}
          >
            <Icon icon={faPen} />
          </Link>
          <Button
            theme="red"
            size="md"
            shape="pill"
            title="delete group"
            aria-label="delete group"
            onClick={() => {}}
          >
            <Icon icon={faTimes} />
          </Button>
        </ButtonControls>
      </div>
      <div className="expense-group__body">
        <div className="expense-group__expenses">
          {showAlert && (
            <Alert
              theme="error"
              className="margin-bottom-16"
              onClose={() => setShowAlert(false)}
            >
              You have {overdueExpenses} unpaid overdue expense{''}
              {overdueExpenses > 1 && 's'}.
            </Alert>
          )}
          <ExpenseList expenses={expenses} />
        </div>
        <div className="expense-group__summary">
          <h2 className="text-size-20 margin-bottom-20">Spending Snapshot</h2>
          <Statistic
            theme={isAlmostOverBudget ? 'red' : 'green'}
            value={totalBalance}
            label="Total Balance"
            size="md"
            topLabel
          />
          {isAlmostOverBudget && (
            <div className="expense-group__budget-warning">
              <Icon icon={faExclamationTriangle} />
              <Hint type="error">
                Your total balance is greater than {budgetLimitPercentage}% of
                this month&apos;s budget.
              </Hint>
            </div>
          )}
          <Statistic
            className="margin-top-20"
            value={unpaidBalance}
            label="Unpaid Balance"
            size="md"
            topLabel
          />
          <Statistic
            {...(isOverBudget && { theme: 'red' })}
            className="margin-top-20"
            value={leftOverBalance}
            label="Left Over Balance"
            size="md"
            topLabel
          />
        </div>
      </div>
    </div>
  );
};

ExpenseGroupLayout.propTypes = {
  id: PropTypes.string,
  totalBudget: PropTypes.number,
  totalBalance: PropTypes.string,
  isAlmostOverBudget: PropTypes.bool,
  isOverBudget: PropTypes.bool,
  leftOverBalance: PropTypes.string,
  unpaidBalance: PropTypes.string,
  overdueExpenses: PropTypes.number,
  budgetLimitPercentage: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      balance: PropTypes.number,
      dueDate: PropTypes.string,
      paid: PropTypes.bool,
      note: PropTypes.string,
    }),
  ),
};

ExpenseGroupLayout.defaultProps = {
  id: '',
  totalBudget: 0,
  totalBalance: 0,
  isAlmostOverBudget: false,
  isOverBudget: false,
  leftOverBalance: 0,
  unpaidBalance: 0,
  overdueExpenses: 0,
  budgetLimitPercentage: 0,
  startDate: '',
  endDate: '',
  expenses: [],
};

export default ExpenseGroupLayout;
