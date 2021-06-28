import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, authenticated, path, ...rest }) => {
  return (
    <Route path={path}>
      {authenticated ? (
        <Comp authenticated={authenticated} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { previousLocation: path, error: 'Please log in' }
          }}
        />
      )}
    </Route>
  );
};

export default ProtectedRoute;
