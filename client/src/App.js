import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
