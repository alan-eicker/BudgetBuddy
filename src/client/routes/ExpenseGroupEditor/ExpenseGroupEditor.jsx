import React, { useEffect, forwardRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import mongoose from 'mongoose';
import { FormField, Button, CheckOption } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useAppContent } from '../../AppProvider';

const ExpenseGroupEditor = forwardRef((props, ref) => {
  const { setShowLoader } = useAppContent();
  const { id } = useParams();
  const { pathname } = useLocation();

  const isEdit = pathname.match(/\/edit/);

  const title = isEdit ? 'Edit Expense Group' : 'Add Expense Group';

  const GET_EXPENSE_GROUP = gql`
    query GetExpenseGroup($id: String!) {
      expenseGroup(_id: $id) {
        _id
        startDate
        endDate
        totalBudget
        expenses {
          _id
          title
          balance
          dueDate
          paid
          note
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_EXPENSE_GROUP, {
    skip: !isEdit,
    variables: {
      id,
    },
  });

  const initialValues = {
    startDate: '',
    endDate: '',
    totalBudget: '',
    expenses: [],
  };

  const validationSchema = yup.object().shape({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required'),
    totalBudget: yup.string().required('Total budget is required'),
    expenses: yup.array().of(
      yup.object().shape({
        title: yup.string().required('Expense title is required'),
        balance: yup.number().required('Expense balance is required'),
      }),
    ),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formValues) => {
      console.log(formValues);
    },
  });

  const addExpense = () => {
    setFieldValue('expenses', [
      ...values.expenses,
      {
        _id: mongoose.Types.ObjectId(),
        title: '',
        balance: '',
        dueDate: '',
        paid: false,
        note: '',
      },
    ]);
  };

  const deleteExpense = (_id) => {
    setFieldValue(
      'expenses',
      values.expenses.filter((exp) => exp._id !== _id),
    );
  };

  if (error) {
    throw new Error(error);
  }

  if (loading) {
    setShowLoader(true);
  }

  useEffect(() => {
    if (!loading && data) {
      setValues({
        ...values,
        totalBudget: data.expenseGroup.totalBudget,
        startDate: data.expenseGroup.startDate,
        endDate: data.expenseGroup.endDate,
        expenses: data.expenseGroup.expenses,
      });

      setShowLoader(false);
    }
  }, [data, loading]);

  return (
    <form
      ref={ref}
      className="expense-group-form"
      onSubmit={handleSubmit}
      noValidate
    >
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
                value={values.startDate}
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
                value={values.endDate}
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
                    value={expense.title}
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
                    value={expense.balance}
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
                    value={expense.dueDate}
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
                    value={expense.note}
                    onChange={handleChange}
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
                      onClick={() => deleteExpense(expense._id)}
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
        onClick={addExpense}
        block
      >
        + add expense
      </Button>
    </form>
  );
});

ExpenseGroupEditor.triggerSubmit = (ref) => {
  if (ref.current) {
    ref.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    );
  }
};

ExpenseGroupEditor.displayName = 'ExpenseGroupEditor';

export default ExpenseGroupEditor;
