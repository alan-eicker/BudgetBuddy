import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./routes/Dashboard'));

const App = () => (
  <div>
    <div>{/* navigation... */}</div>
    <div>
      <Suspense fallback={null}>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  </div>
);

export default App;
