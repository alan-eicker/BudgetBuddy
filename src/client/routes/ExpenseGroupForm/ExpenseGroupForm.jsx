import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormField, Button, CheckOption } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useAppContent } from '../../AppProvider';

const ExpenseGroupForm = () => {
  const { setShowLoader } = useAppContent();
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isEdit = pathname.match(/\/edit/);

  const title = isEdit ? 'Edit Expense Group' : 'Add Expense Group';

  const GET_EXPENSE_GROUP = gql`
    query GetExpenseGroup($id: String!) {
      expenseGroup(_id: $id) {
        _id
        startDate
        endDate
        totalBudget
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
    startDate: '03/09/2022',
    endDate: '',
    totalBudget: '',
  };

  const validationSchema = yup.object().shape({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required'),
    totalBudget: yup.string().required('Total budget is required'),
  });

  const { values, handleChange, handleSubmit, touched, errors, setValues } =
    useFormik({
      initialValues,
      validationSchema,
      handleSubmit: (formValues) => {
        console.log(formValues);
      },
    });

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
      });

      setShowLoader(false);
    }
  }, [data, loading]);

  return (
    <form className="expense-group-form" onSubmit={handleSubmit} noValidate>
      <h1 className="expense-group-form__title">{title}</h1>
      <Grid className="expense-group-form__form-fields">
        <Row>
          <Col md={6}>
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
        </Row>
        <Row>
          <Col md={6}>
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
        </Row>
        <Row>
          <Col md={6}>
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
        <Row>
          <Col>
            <Button
              className="margin-top-8"
              type="submit"
              theme="indigo"
              shape="pill"
            >
              Submit
            </Button>
            <Button
              className="margin-left-8"
              theme="white"
              shape="pill"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Grid>
    </form>
  );
};

export default ExpenseGroupForm;
