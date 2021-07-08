import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/route';

export default function ProtectedRoute({ children, ...rest }) {
  const currentUser = localStorage.getItem('loggedInUser');
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (currentUser) {
          return React.cloneElement(children, currentUser);
        }

        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
export function ProtectedLogin({ children, ...rest }) {
  const currentUser = localStorage.getItem('loggedInUser');
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (currentUser) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.DASHBOARD,
                state: { from: location },
              }}
            />
          );
        }
        if (!currentUser) {
          return React.cloneElement(children, currentUser);
        }

        return null;
      }}
    />
  );
}
export function ProtectedSignUp({ currentUser, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (currentUser) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.DASHBOARD,
                state: { from: location },
              }}
            />
          );
        }
        if (!currentUser) {
          return React.cloneElement(children, currentUser);
        }

        return null;
      }}
    />
  );
}
ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
