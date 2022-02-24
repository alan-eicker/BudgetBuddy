import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import settingsSvg from './static/images/settings.svg';
import userSvg from './static/images/user.svg';

import Masthead from './components/Masthead';

const Dashboard = lazy(() => import('./routes/Dashboard'));

const App = () => (
  <div>
    <div>
      <Masthead
        appName="Budget Buddy"
        nav={[
          <Link
            to="/settings"
            className="settings"
            title="settings"
            aria-label="settings"
          >
            <img src={settingsSvg} alt="settings" />
          </Link>,
          <Link
            to="/user"
            className="user"
            aria-label="user profile"
            title="user profile"
          >
            <img src={userSvg} alt="user" />
          </Link>,
        ]}
      />
    </div>
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
