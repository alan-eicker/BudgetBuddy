import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Button, Tag } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from '../../utilities/numbers';
import { getDaysPastDue } from '../../utilities/date';
import useExpenseCard from './useExpenseCard';

const ExpenseCard = ({ _id, title, balance, dueDate, paid, note }) => {
  const { onPaidChange } = useExpenseCard();
  const { isPastDate, daysOverdue } = getDaysPastDue(dueDate);
  const isPastDue = isPastDate && !paid && dueDate;

  return (
    <div
      key={_id}
      className={classnames('expense-card', {
        'is-overdue': isPastDue,
      })}
    >
      <div className="expense-card__head">
        <div className="expense-card__name">{title}</div>
        <div className="expense-card__balance">
          ${formatNumber(balance)} {dueDate && `| Due by: ${dueDate}`}{' '}
          {isPastDue && (
            <Tag theme="red" className="margin-left-4">{`${daysOverdue} ${
              daysOverdue > 1 ? 'days' : 'day'
            } past due`}</Tag>
          )}
        </div>
        {note && <div className="expense-card__notes">{note}</div>}
      </div>
      <div className="expense-card__body">
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
};

ExpenseCard.defaultProps = {
  _id: '',
  title: '',
  balance: 0,
  dueDate: null,
  paid: false,
  note: null,
};

export default ExpenseCard;
