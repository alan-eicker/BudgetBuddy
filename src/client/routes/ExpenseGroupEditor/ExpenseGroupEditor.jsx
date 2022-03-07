import React, { useEffect, forwardRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import mongoose from 'mongoose';
import ExpenseGroupEditorForm from '../../components/ExpenseGroupEditorForm';
import { useAppContext } from '../../AppProvider';

const ExpenseGroupEditor = forwardRef((props, ref) => {
  const { setShowLoader } = useAppContext();
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

  const { setFieldValue, setValues, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formValues) => {
      console.log(formValues);
    },
  });

  const addExpense = () => {
    setFieldValue('expenses', [
      ...formik.values.expenses,
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
      formik.values.expenses.filter((exp) => exp._id !== _id),
    );
  };

  if (error) {
    throw new Error(error);
  }

  useEffect(() => {
    setShowLoader(loading);
  }, [loading, setShowLoader]);

  useEffect(() => {
    if (data) {
      setValues({
        ...formik.values,
        totalBudget: data.expenseGroup.totalBudget,
        startDate: data.expenseGroup.startDate,
        endDate: data.expenseGroup.endDate,
        expenses: data.expenseGroup.expenses,
      });

      setShowLoader(false);
    }
  }, [data]);

  return (
    <ExpenseGroupEditorForm
      ref={ref}
      title={title}
      onAddExpense={addExpense}
      onDeleteExpense={deleteExpense}
      {...formik}
    />
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
