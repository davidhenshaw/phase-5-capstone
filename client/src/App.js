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

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/">
            <SignupForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
