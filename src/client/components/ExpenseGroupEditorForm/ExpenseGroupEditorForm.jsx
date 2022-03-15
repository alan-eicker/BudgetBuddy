import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FormField, Button, CheckOption, Alert } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

const ExpenseGroupEditorForm = forwardRef(
  (
    {
      title,
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      onAddExpense,
      onDeleteExpense,
      confirmation,
    },
    ref,
  ) => (
    <form
      ref={ref}
      className="expense-group-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {confirmation && (
        <Alert className="margin-bottom-16" theme="success">
          {confirmation}
        </Alert>
      )}
      <h1 className="expense-group-form__title">{title}</h1>
      <fieldset>
        <legend>Expense Group Details</legend>
        <Grid className="expense-group-form__form-fields">
          <Row>
            <Col md={4}>
              <FormField
                type="date"
                name="startDate"
                label="Start Date"
                defaultValue={values.startDate}
                onChange={handleChange}
                hasError={!!(errors.startDate && touched.startDate)}
                errorText={errors.startDate}
              />
            </Col>
            <Col md={4}>
              <FormField
                type="date"
                name="endDate"
                label="End Date"
                defaultValue={values.endDate}
                onChange={handleChange}
                hasError={!!(errors.endDate && touched.endDate)}
                errorText={errors.endDate}
              />
            </Col>
            <Col md={4}>
              <FormField
                type="number"
                name="totalBudget"
                label="Total Budget"
                defaultValue={values.totalBudget}
                onChange={handleChange}
                hasError={!!(errors.totalBudget && touched.totalBudget)}
                errorText={errors.totalBudget}
              />
            </Col>
          </Row>
        </Grid>
      </fieldset>

      <fieldset className="margin-top-20">
        <legend>Expenses</legend>
        {values.expenses.length === 0 && (
          <Grid className="expense-group-form__form-fields">
            <Row md={12}>
              <Col>You have not added any expenses.</Col>
            </Row>
          </Grid>
        )}
        {values.expenses.map((expense, idx) => {
          const hasErrors =
            errors.expenses &&
            errors.expenses.length > 0 &&
            touched.expenses &&
            touched.expenses.length > 0;

          return (
            <Grid
              className="expense-group-form__form-fields"
              key={['expense-field', idx].join('-')}
            >
              <Row>
                <Col md={12}>
                  <FormField
                    label="Title"
                    name={`expenses[${idx}].title`}
                    defaultValue={expense.title}
                    onChange={handleChange}
                    {...(hasErrors && {
                      hasError: !!errors.expenses[idx]?.title,
                      errorText: errors.expenses[idx]?.title,
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormField
                    type="number"
                    label="Balance"
                    name={`expenses[${idx}].balance`}
                    defaultValue={expense.balance}
                    onChange={handleChange}
                    {...(hasErrors && {
                      hasError: !!errors.expenses[idx]?.balance,
                      errorText: errors.expenses[idx]?.balance,
                    })}
                  />
                </Col>
                <Col md={6}>
                  <FormField
                    type="date"
                    label="Due Date"
                    name={`expenses[${idx}].dueDate`}
                    defaultValue={expense.dueDate}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <CheckOption
                    className="margin-top-12 margin-bottom-4"
                    label="Is Paid"
                    name={`expenses[${idx}].paid`}
                    checked={expense.paid}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormField
                    style={{ height: 60 }}
                    type="textarea"
                    label="Note"
                    name={`expenses[${idx}].note`}
                    onChange={handleChange}
                    defaultValue={expense.note}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-align-right">
                    <Button
                      theme="red"
                      size="md"
                      shape="pill"
                      onClick={() => onDeleteExpense(expense._id)}
                    >
                      delete expense
                    </Button>
                  </div>
                </Col>
              </Row>
            </Grid>
          );
        })}
      </fieldset>
      <Button
        theme="blue-gray"
        themeVariant="light"
        shape="pill"
        size="md"
        className="margin-top-20 margin-bottom-20"
        onClick={onAddExpense}
        block
      >
        + add expense
      </Button>
    </form>
  ),
);

ExpenseGroupEditorForm.propTypes = {
  title: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  confirmation: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  onAddExpense: PropTypes.func,
  onDeleteExpense: PropTypes.func,
};

ExpenseGroupEditorForm.defaultProps = {
  title: '',
  values: {},
  errors: {},
  touched: {},
  confirmation: '',
  handleChange: () => {},
  handleSubmit: () => {},
  onAddExpense: () => {},
  onDeleteExpense: () => {},
};

ExpenseGroupEditorForm.displayName = 'ExpenseGroupEditorForm';

export default ExpenseGroupEditorForm;
