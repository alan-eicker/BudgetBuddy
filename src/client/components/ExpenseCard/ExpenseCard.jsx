import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Switch, Button } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ExpenseCard = ({
  _id,
  title,
  balance,
  dueDate,
  paid,
  note,
  onChange,
}) => {
  const isOverDue = dueDate ? new Date() > new Date(dueDate) && !paid : false;

  return (
    <div
      key={_id}
      className={classnames('expense-card', { 'is-overdue': isOverDue })}
    >
      <div className="expense-card__head">
        <div className="expense-card__name">{title}</div>
        <div className="expense-card__balance">
          ${balance} {dueDate && `| Due by: ${dueDate}`}{' '}
          {isOverDue && '(Past Due)'}
        </div>
        {note && <div className="expense-card__notes">{note}</div>}
      </div>
      <div className="expense-card__body">
        <Switch
          layout="stacked"
          label={paid ? 'Paid' : 'Not paid'}
          onChange={() => onChange(_id)}
          checked={paid}
        />
        <div className="expense-card__action-btns">
          <Button aria-label="edit" size="md" onClick={() => {}}>
            <Icon icon={faPencilAlt} />
          </Button>
          <Button aria-label="delete" size="md" onClick={() => {}}>
            <Icon icon={faTrashAlt} />
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
  onChange: PropTypes.func,
};

ExpenseCard.defaultProps = {
  _id: '',
  title: '',
  balance: 0,
  dueDate: null,
  paid: false,
  note: null,
  onChange: () => {},
};

export default ExpenseCard;
