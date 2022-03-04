import React, { Suspense, lazy, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@atomikui/core';
import AppProvider from './AppProvider';
import Layout from './components/Layout';
import Masthead from './components/Masthead';

import ExpenseGroupEditorForm from './routes/ExpenseGroupEditor/ExpenseGroupEditor';

const Login = lazy(() => import('./routes/Login'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const ExpenseGroup = lazy(() => import('./routes/ExpenseGroup'));
const ExpenseGroupEditor = lazy(() => import('./routes/ExpenseGroupEditor'));

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isIndexPage = pathname === '/';
  const isExpenseGroupEditor = pathname.match(/add|edit/);

  const ExpenseGroupEditorRef = useRef();

  return (
    <AppProvider>
      <Layout
        isIndexPage
        header={
          !isIndexPage ? (
            <Masthead
              appName="Budget Buddy"
              nav={[
                <button type="button">+ Expense Group</button>,
                <button type="button">log out</button>,
              ]}
            />
          ) : null
        }
        {...(isExpenseGroupEditor && {
          subheader: (
            <>
              <Button
                theme="indigo"
                shape="pill"
                onClick={() =>
                  ExpenseGroupEditorForm.triggerSubmit(ExpenseGroupEditorRef)
                }
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
            </>
          ),
        })}
      >
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route index element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="expense-group/:id" element={<ExpenseGroup />} />
              <Route
                path="expense-group/add"
                element={<ExpenseGroupEditor ref={ExpenseGroupEditorRef} />}
              />
              <Route
                path="expense-group/edit/:id"
                element={<ExpenseGroupEditor ref={ExpenseGroupEditorRef} />}
              />
            </Routes>
          </Suspense>
        </main>
      </Layout>
    </AppProvider>
  );
};

export default App;
