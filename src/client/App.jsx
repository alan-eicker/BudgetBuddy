import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppProvider from './AppProvider';
import Layout from './components/Layout';
import Masthead from './components/Masthead';

const Login = lazy(() => import('./routes/Login'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const ExpenseGroup = lazy(() => import('./routes/ExpenseGroup'));
const ExpenseGroupEditor = lazy(() => import('./routes/ExpenseGroupEditor'));

const App = () => {
  const { pathname } = useLocation();
  const isIndexPage = pathname === '/';

  return (
    <AppProvider>
      <Layout
        header={
          !isIndexPage ? (
            <Masthead
              appName="Budget Buddy"
              nav={[
                <button type="button" to="/user" className="user">
                  log out
                </button>,
              ]}
            />
          ) : null
        }
      >
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expense-group/:id" element={<ExpenseGroup />} />
              <Route
                path="/expense-group/add"
                element={<ExpenseGroupEditor />}
              />
              <Route
                path="/expense-group/edit/:id"
                element={<ExpenseGroupEditor />}
              />
            </Routes>
          </Suspense>
        </main>
      </Layout>
    </AppProvider>
  );
};

export default App;
