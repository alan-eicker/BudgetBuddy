import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Button, Tag } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from '../../utilities/numbers';
import { getDaysPastDue } from '../../utilities/date';
import useExpenseCard from './useExpenseCard';

const ExpenseCard = ({
  _id,
  title,
  balance,
  dueDate,
  paid,
  note,
  isSummary,
  hasOverdueExpenses,
}) => {
  const { onPaidChange } = useExpenseCard();
  const daysPastDue = getDaysPastDue(dueDate);
  const isOverDue = dueDate && !paid && daysPastDue > 0;

  return (
    <div
      key={_id}
      className={classnames('expense-card', {
        'is-overdue': isOverDue || hasOverdueExpenses,
      })}
    >
      <div className="expense-card__head">
        <div className="expense-card__name">{title}</div>
        <div className="expense-card__balance">
          {isSummary ? 'Total budget:' : 'Balance'} ${formatNumber(balance)}{' '}
          {dueDate && `| Due by: ${dueDate}`}{' '}
          {isOverDue && (
            <Tag theme="red" className="margin-left-4">{`${daysPastDue} ${
              daysPastDue > 1 ? 'days' : 'day'
            } past due`}</Tag>
          )}
        </div>
        {note && <div className="expense-card__notes">{note}</div>}
      </div>
      <div className="expense-card__body">
        {isSummary ? (
          <div className="expense-card__chevron-icon">
            <Icon icon={faChevronRight} size="lg" />
          </div>
        ) : (
          <>
            <div className="expense-card__paid-status">
              <Switch
                layout="stacked"
                label={paid ? 'Paid' : 'Not paid'}
                onChange={() => onPaidChange(_id, !paid)}
                checked={paid}
              />
            </div>
            <div className="expense-card__action-btns">
              <Button aria-label="delete" size="md" onClick={() => {}}>
                <Icon icon={faTimes} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

ExpenseCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  balance: PropTypes.number,
  dueDate: PropTypes.string,
  paid: PropTypes.bool,
  note: PropTypes.string,
  isSummary: PropTypes.bool,
  hasOverdueExpenses: PropTypes.bool,
};

ExpenseCard.defaultProps = {
  _id: '',
  title: '',
  balance: 0,
  dueDate: null,
  paid: false,
  note: null,
  isSummary: false,
  hasOverdueExpenses: false,
};

export default ExpenseCard;
