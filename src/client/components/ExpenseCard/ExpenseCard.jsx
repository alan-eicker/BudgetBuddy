import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Button, Tag, ButtonControls } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from '../../utilities/numbers';
import { getDaysPastDue } from '../../utilities/date';
import useExpense from '../../hooks/useExpense';
import { useExpenseListContext } from '../../providers/ExpenseListProvider';

const ExpenseCard = ({ _id, title, balance, dueDate, paid, note }) => {
  const { onPaidChange, onDelete } = useExpense();
  const { deleteId, setDeleteId } = useExpenseListContext();
  const { isPastDue, daysOverdue } = getDaysPastDue(dueDate);
  const flagAsOverdue = isPastDue && !paid && dueDate;

  const deleteInProgress = deleteId === _id;

  return (
    <div
      key={_id}
      className={classnames('expense-card', {
        'is-overdue': flagAsOverdue,
      })}
    >
      <div
        className={classnames('expense-card__delete-confirm', {
          'is-active': deleteInProgress,
        })}
      >
        <div className="text-size-20">Delete {title}?</div>
        <ButtonControls>
          <Button
            {...(!deleteInProgress && { tabindex: '-1' })}
            shape="pill"
            theme="white"
            size="md"
            onClick={() => onDelete(deleteId)}
          >
            delete
          </Button>
          <Button
            {...(!deleteInProgress && { tabindex: '-1' })}
            shape="pill"
            theme="indigo"
            size="md"
            onClick={() => setDeleteId()}
          >
            cancel
          </Button>
        </ButtonControls>
      </div>
      <div className="expense-card__head">
        <div className="expense-card__name">{title}</div>
        <div className="expense-card__balance">
          ${formatNumber(balance)} {dueDate && `| Due by: ${dueDate}`}{' '}
          {flagAsOverdue && (
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
          <Button
            aria-label="delete"
            size="md"
            onClick={() => setDeleteId(_id)}
          >
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
