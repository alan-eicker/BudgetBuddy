import React, { Suspense, lazy, useRef } from 'react';
import { Route, Switch, Link, useLocation, useHistory } from 'react-router-dom';
import { Button } from '@atomikui/core';
import AppProvider from './AppProvider';
import Layout from './components/Layout';
import Masthead from './components/Masthead';

import ExpenseGroupEditorForm from './containers/ExpenseGroupEditor/ExpenseGroupEditor';

const Login = lazy(() => import('./containers/Login'));
const ExpenseGroupsSummary = lazy(() =>
  import('./containers/ExpenseGroupsSummary'),
);
const ExpenseGroup = lazy(() => import('./containers/ExpenseGroup'));
const ExpenseGroupEditor = lazy(() =>
  import('./containers/ExpenseGroupEditor'),
);
const PageNotFound = lazy(() => import('./components/PageNotFound'));

const navItems = [
  <Link key="nav-item-1" to="/expense-groups/add">
    + Expense Group
  </Link>,
  <button key="nav-item-2" type="button">
    log out
  </button>,
];

const App = () => {
  const history = useHistory();
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
            <Masthead appName="Budget Buddy" nav={navItems} />
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
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
            </>
          ),
        })}
      >
        <main>
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/expense-groups/edit/:id">
                <ExpenseGroupEditor ref={ExpenseGroupEditorRef} />
              </Route>
              <Route path="/expense-groups/add">
                <ExpenseGroupEditor ref={ExpenseGroupEditorRef} />
              </Route>
              <Route exact path="/expense-groups/:id">
                <ExpenseGroup />
              </Route>
              <Route path="/expense-groups">
                <ExpenseGroupsSummary />
              </Route>
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Suspense>
        </main>
      </Layout>
    </AppProvider>
  );
};

export default App;
