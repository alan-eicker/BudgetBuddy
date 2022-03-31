import React, { Suspense, lazy, useRef } from 'react';
import { Route, Switch, Link, useLocation, useHistory } from 'react-router-dom';
import { Button } from '@atomikui/core';
import Layout from './components/Layout';
import Masthead from './components/Masthead';
import ExpenseGroupEditorForm from './containers/ExpenseGroupEditor/ExpenseGroupEditor';
import useLogout from './hooks/useLogout';

const Login = lazy(() => import('./containers/Login'));
const ExpenseGroupsSummary = lazy(() =>
  import('./containers/ExpenseGroupsSummary'),
);
const ExpenseGroup = lazy(() => import('./containers/ExpenseGroup'));
const ExpenseGroupEditor = lazy(() =>
  import('./containers/ExpenseGroupEditor'),
);
const PageNotFound = lazy(() => import('./components/PageNotFound'));

const App = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useLogout();
  const isIndexPage = pathname === '/';
  const isExpenseGroupEditor = pathname.match(/add|edit/);

  const ExpenseGroupEditorRef = useRef();

  return (
    <Layout
      isIndexPage
      header={
        !isIndexPage ? (
          <Masthead appName="Budget Buddy">
            <Link key="nav-item-1" to="/expense-groups/add">
              + Expense Group
            </Link>
            <Button onClick={logout}>Logout</Button>
          </Masthead>
        ) : null
      }
      {...(isExpenseGroupEditor && {
        subheader: (
          <>
            <Button
              theme="lime"
              shape="pill"
              onClick={() =>
                ExpenseGroupEditorForm.triggerSubmit(ExpenseGroupEditorRef)
              }
            >
              Save
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
  );
};

export default App;
