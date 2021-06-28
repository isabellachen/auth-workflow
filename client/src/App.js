import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.scss';

const App = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      history.push({
        pathname: '/profile'
      });
    }
  }, [history, authenticated]);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home
            setUserData={setUserData}
            userData={userData}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute
          path="/profile"
          authenticated={authenticated}
          component={Profile}
          userData={userData}
        />
      </Switch>
    </div>
  );
};

export default App;
