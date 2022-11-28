import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ButtonControls,
  Button,
  Statistic,
  Modal,
  FormField,
} from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faPen,
  faCopy,
  faTimes,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utilities/date';
import { formatNumber } from '../../utilities/numbers';
import ExpenseList from '../ExpenseList';
import AlertMessage from '../AlertMessage';
import useExpenseGroup from '../../hooks/useExpenseGroup';

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
  const [showDuplicateExpenseModal, setShowDuplicateExpenseModal] =
    useState(false);
  const [duplicateExpenseGroupData, setDuplicateExpenseGroupData] = useState(
    {},
  );
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const { onDeleteExpenseGroup, onDuplicateExpenseGroup } = useExpenseGroup();

  const handleDuplicateFormChange = (e) => {
    setDuplicateExpenseGroupData({
      ...duplicateExpenseGroupData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setShowAlert(overdueExpenses > 0);
  }, [overdueExpenses]);

  return (
    <>
      <div className="expense-group">
        <div className="expense-group__head">
          <h1 className="expense-group__title">
            {formatDate(startDate)} - {formatDate(endDate)}
            <span>Total Budget: ${formatNumber(totalBudget)}</span>
          </h1>
          <ButtonControls className="expense-group__controls">
            <Link title="go back" aria-label="go back" to="/expense-groups">
              <Icon icon={faArrowLeft} size="lg" color="black" />
            </Link>
            <Link
              title="edit expense"
              aria-label="edit expense group"
              to={`/expense-groups/edit/${id}`}
            >
              <Icon icon={faPen} color="black" />
            </Link>
            <Button
              theme="yellow"
              size="md"
              shape="pill"
              title="duplicate expense group"
              aria-label="duplicate expense group"
              onClick={() => setShowDuplicateExpenseModal(true)}
            >
              <Icon icon={faCopy} color="black" />
            </Button>
            <Button
              theme="white"
              size="md"
              shape="pill"
              title="delete group"
              aria-label="delete expense group"
              onClick={() => setShowDeleteConfirmModal(true)}
            >
              <Icon icon={faTimes} />
            </Button>
          </ButtonControls>
        </div>
        <div className="expense-group__body">
          <div className="expense-group__expenses">
            <AlertMessage
              theme="error"
              text={`You have ${overdueExpenses} unpaid overdue expense ${
                overdueExpenses > 1 && 's'
              }`}
              isActive={showAlert}
              onClose={() => setShowAlert(false)}
            />
            <ExpenseList expenses={expenses} />
          </div>
          <div className="expense-group__summary">
            <h2 className="text-size-20 margin-bottom-20">Spending Snapshot</h2>
            <Statistic
              value={totalBalance}
              label="Total Balance"
              size="md"
              topLabel
            />
            {isAlmostOverBudget && (
              <div className="margin-top-8">
                <div className="expense-group__budget-warning">
                  <div className="expense-group__budget-warning__icon">
                    <Icon icon={faExclamationTriangle} />
                  </div>
                  <div className="expense-group__budget-warning__text">
                    Your total balance is greater than {budgetLimitPercentage}%
                    of this month&apos;s budget.
                  </div>
                </div>
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
      <form>
        <Modal
          disableEscapKey
          disableOverlayclick
          isOpen={showDuplicateExpenseModal}
          className="expense-group__confirm-delete-modal"
          title="Duplicate Expense Group"
          footer={
            <>
              <>
                <Button
                  shape="pill"
                  theme="yellow"
                  onClick={(e) =>
                    onDuplicateExpenseGroup(
                      e,
                      expenses,
                      duplicateExpenseGroupData,
                    )
                  }
                >
                  duplicate
                </Button>
                <Button
                  shape="pill"
                  className="margin-left-16"
                  theme="white"
                  onClick={() => setShowDuplicateExpenseModal(false)}
                >
                  cancel
                </Button>
              </>
            </>
          }
        >
          <FormField
            className="margin-bottom-8"
            label="Total Budget"
            name="totalBudget"
            onChange={handleDuplicateFormChange}
          />
          <FormField
            className="margin-bottom-16"
            label="Start Date"
            name="startDate"
            type="date"
            onChange={handleDuplicateFormChange}
          />
          <FormField
            label="End Date"
            name="endDate"
            type="date"
            onChange={handleDuplicateFormChange}
          />
        </Modal>
      </form>
      <Modal
        disableEscapKey
        disableOverlayclick
        isOpen={showDeleteConfirmModal}
        className="expense-group__confirm-delete-modal"
        title="Whoa, hold on a second!"
        footer={
          <>
            <Button
              shape="pill"
              theme="yellow"
              onClick={() => onDeleteExpenseGroup(id)}
            >
              delete
            </Button>
            <Button
              shape="pill"
              className="margin-left-16"
              theme="white"
              onClick={() => setShowDeleteConfirmModal(false)}
            >
              cancel
            </Button>
          </>
        }
      >
        Are you sure you want to delete this expense group?
      </Modal>
    </>
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
