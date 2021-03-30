import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Inicio from './components/layout/Inicio';
import NewAccount from './components/auth/NewAccount';

//import constext states
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';

const  App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/newaccount" component={NewAccount} />
              <Route exact path="/inicio" component={Inicio} />
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;

