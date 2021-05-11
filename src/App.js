import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTE from './constants/route';
import UserContext from './context/user';
import { useState } from 'react';
import { ProtectedLogin, ProtectedSignUp } from './helpers/protected-route';
import ProtectedRoute from './helpers/protected-route';
import useAuthListener from './hooks/use-auth';
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Signup = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/notfound'));
const App = () => {
  const [user, setUser] = useState(useAuthListener());
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <ProtectedLogin value={user} path={ROUTE.LOGIN} exact>
            <Route path={ROUTE.LOGIN} component={Login} exact />
          </ProtectedLogin>
          <ProtectedSignUp value={user} path={ROUTE.SIGN_UP}>
          <Route path={ROUTE.SIGN_UP} setUser={value.setUser} component={Signup} exact />
          </ProtectedSignUp>
      
          <ProtectedRoute
            value={user}
            setUser={value.set}
            path={ROUTE.DASHBOARD}
            exact
          >
            <Dashboard user={value.user} setUser={value.setUser} />
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </UserContext.Provider>
  );
};

export default App;
