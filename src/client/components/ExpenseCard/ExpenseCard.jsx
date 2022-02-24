import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@atomikui/core';

const ExpenseCard = ({
  id,
  name,
  balance,
  dueDate,
  isPaid,
  notes,
  onChange,
}) => {
  const paid = Boolean(isPaid);
  return (
    <div key={id} className="expense-card">
      <div className="expense-card__head">
        <div className="expense-card__name">{name}</div>
        <div className="expense-card__balance">
          ${balance} | Due by: {dueDate}
        </div>
        {notes && <div className="expense-card__notes">{notes}</div>}
      </div>
      <div className="expense-card__body">
        <Switch
          layout="stacked"
          label={paid ? 'Paid' : 'Not paid'}
          onChange={() => onChange(id)}
          checked={paid}
        />
      </div>
    </div>
  );
};

ExpenseCard.propTypes = {
  name: PropTypes.string,
  balance: PropTypes.number,
  dueDate: PropTypes.string,
  isPaid: PropTypes.number,
  id: PropTypes.number,
  notes: PropTypes.string,
  onChange: PropTypes.func,
};

ExpenseCard.defaultProps = {
  name: '',
  balance: 0,
  dueDate: null,
  isPaid: false,
  id: '',
  notes: null,
  onChange: () => {},
};

export default ExpenseCard;
