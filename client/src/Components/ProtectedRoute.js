import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, authenticated, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return authenticated ? (
          <Comp loggedin={authenticated} {...props} />
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
