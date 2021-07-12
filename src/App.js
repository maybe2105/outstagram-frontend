import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ROUTE from './constants/route';
import UserContext from './context/user';
import { useState } from 'react';
import { ProtectedLogin, ProtectedSignUp } from './helpers/protected-route';
import ProtectedRoute from './helpers/protected-route';
import useUser from './hooks/use-user';
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Signup = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/notfound'));
const App = () => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const currentUser = useUser(user);
  return (
    <UserContext.Provider value={{ value, updateUser, currentUser }}>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <ProtectedLogin
            currentUser={currentUser.user}
            path={ROUTE.LOGIN}
            exact
          >
            <Route path={ROUTE.LOGIN} component={Login} exact />
          </ProtectedLogin>
          <ProtectedSignUp currentUser={currentUser.user} path={ROUTE.SIGN_UP}>
            <Route path={ROUTE.SIGN_UP} component={Signup} exact />
          </ProtectedSignUp>
          <ProtectedRoute currentUser={currentUser.user} path={ROUTE.DASHBOARD}>
            <Dashboard
              path={ROUTE.DASHBOARD}
              currentUser={currentUser.user}
            ></Dashboard>
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </UserContext.Provider>
  );
};

export default App;
