import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.scss';

const App = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      history.push({
        pathname: '/profile'
      });
    }
  }, [history, loggedIn]);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
        />
      </Switch>
    </div>
  );
};

export default App;
