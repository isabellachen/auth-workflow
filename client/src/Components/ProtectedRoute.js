import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp loggedin={loggedIn} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { previousLocation: path, error: 'Please log in' }
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
