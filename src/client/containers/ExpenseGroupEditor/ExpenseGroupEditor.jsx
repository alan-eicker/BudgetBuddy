import React, { useEffect, forwardRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import mongoose from 'mongoose';
import ExpenseGroupEditorForm from '../../components/ExpenseGroupEditorForm';
import useExpenseGroup from '../ExpenseGroup/useExpenseGroup';
import useExpenseGroupEditor from './useExpenseGroupEditor';
import { useAppContext } from '../../providers/AppProvider';

const ExpenseGroupEditor = forwardRef((_, ref) => {
  const { setShowLoader } = useAppContext();
  const { pathname } = useLocation();
  const { data } = useExpenseGroup();
  const { onUpdateExpenseGroup, onCreateExpenseGroup } =
    useExpenseGroupEditor();

  const [initialValues, setInitialValues] = useState({
    startDate: '',
    endDate: '',
    totalBudget: '',
    expenses: [],
  });

  const isEdit = pathname.match(/\/edit/);

  const title = isEdit ? 'Edit Expense Group' : 'Add Expense Group';

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
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (formValues) => {
      if (isEdit) {
        onUpdateExpenseGroup(formValues);
      } else {
        onCreateExpenseGroup(formValues);
      }
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

  useEffect(() => {
    if (data) {
      setInitialValues(data.expenseGroup);
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
