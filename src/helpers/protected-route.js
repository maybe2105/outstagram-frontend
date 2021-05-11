import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/route';

export default function ProtectedRoute({ value, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (value.user !== null) {
          return React.cloneElement(children, value.user);
        }

        if (value.user == null) {
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
export function ProtectedLogin({ value, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (value.user !== null) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.DASHBOARD,
                state: { from: location },
              }}
            />
          );
        }
        if (value.user == null) {
          return React.cloneElement(children, value.user);
        }

        return null;
      }}
    />
  );
}
export function ProtectedSignUp({ value, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (value.user !== null) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.DASHBOARD,
                state: { from: location },
              }}
            />
          );
        }
        if (value.user == null) {
          return React.cloneElement(children, value.user);
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
