import React, { Suspense, lazy, useRef } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';
import { Button } from '@atomikui/core';
import AppProvider from './AppProvider';
import Layout from './components/Layout';
import Masthead from './components/Masthead';

import ExpenseGroupEditorForm from './containers/ExpenseGroupEditor/ExpenseGroupEditor';

const Login = lazy(() => import('./containers/Login'));
const Dashboard = lazy(() => import('./containers/Dashboard'));
const ExpenseGroup = lazy(() => import('./containers/ExpenseGroup'));
const ExpenseGroupEditor = lazy(() =>
  import('./containers/ExpenseGroupEditor'),
);
const PageNotFound = lazy(() => import('./components/PageNotFound'));

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
                <Link to="/expense-group/add">+ Expense Group</Link>,
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
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
      </Layout>
    </AppProvider>
  );
};

export default App;
