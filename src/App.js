import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import NewAccount from './components/auth/NewAccount';

//import constext states
import AuthState from './context/auth/authState';
const  App = () => {
  return (
    <AuthState>
      <Router>
        <Switch>
            <Route exact path="/" component={Auth} />
        </Switch>
      </Router>
    </AuthState>
  );
}



export default App;
