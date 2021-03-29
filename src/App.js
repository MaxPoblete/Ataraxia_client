import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Inicio from './components/layout/Inicio';

//import constext states
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';

const  App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Switch>
              <Route exact path="/" component={Auth} />
              <Route exact path="/inicio" component={Inicio} />
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;

