import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './AppProvider';
import Layout from './components/Layout';
import Masthead from './components/Masthead';

const Dashboard = lazy(() => import('./routes/Dashboard'));
const ExpenseGroup = lazy(() => import('./routes/ExpenseGroup'));

const App = () => (
  <AppProvider>
    <Layout
      header={
        <Masthead
          appName="Budget Buddy"
          nav={[
            <button type="button" to="/user" className="user">
              log out
            </button>,
          ]}
        />
      }
    >
      <Suspense fallback={null}>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/expense-group/:id" element={<ExpenseGroup />} />
        </Routes>
      </Suspense>
    </Layout>
  </AppProvider>
);

export default App;
