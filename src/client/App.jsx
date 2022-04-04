import React, { Suspense, lazy, useRef } from 'react';
import { Route, Switch, Link, useLocation, useHistory } from 'react-router-dom';
import { Button } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
            <Link
              key="nav-item-1"
              to="/expense-groups/add"
              aria-label="add expense group"
            >
              <Icon icon={faPlus} />
            </Link>
            <button onClick={logout} aria-label="log out">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                xmlSpace="preserve"
              >
                <path
                  className="st21"
                  d="M28.7,27.9c0,0,0,0.1,0,0.1c-0.1,0.2-0.5,0.5-0.7,0.6c-0.5,0.5-1.1,0.9-1.6,1.4c-0.8,0.7-1.5,1.4-2.3,2
	c-0.7,0.6-0.8,1.1,0,1.8c0.9,0.8,1.6,1.8,2.4,2.7c3.8-3.7,7.2-7.2,10.7-10.7c0.7-0.7,0.8-1.1,0-1.8c-3.3-3.2-6.6-6.5-9.8-9.8
	c-0.7-0.7-1-0.5-1.6,0c-2.7,2.6-2.7,2.5-0.1,5.1c0.6,0.6,1.3,1.2,1.9,1.8c0.2,0.2,0.6,0.4,0.7,0.6c0.4,0.7-0.8,0.6-1.1,0.6
	c-8.3,0-16.5,0-24.8,0c-1.4,0-1.6-0.3-1.4-1.7C2.6,10.1,12.5,1.3,23.4,0.8c11.7-0.5,22.1,7,25,18.2c3.4,13.3-4.8,26.5-18.3,29.7
	c-3.3,0.8-6.7,0.8-10,0.1c-3.2-0.7-6.3-2-9-3.9c-2.7-1.9-5.1-4.4-6.8-7.2c-0.9-1.5-1.7-3-2.2-4.7c-0.3-0.8-0.5-1.7-0.7-2.5
	C1.2,30,1.1,29.6,1,29.2c-0.1-0.4-0.2-0.8-0.2-1.2C1,27.4,1.5,27.4,2,27.4c4.9,0,9.8,0,14.6,0c2.1,0,4.2,0,6.2,0c1,0,2.1,0,3.1,0
	c0.5,0,1,0,1.5,0C27.8,27.4,28.7,27.4,28.7,27.9z"
                />
              </svg>
            </button>
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
