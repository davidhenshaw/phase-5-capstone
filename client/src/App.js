import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect( () => {
    let token = localStorage.token;
    if(!token) { return undefined }

    axios.post("/auto_login", {"token": token})
    .then(res => setUser(res.data))

  },[]);

  const handleLogin = (user) => 
  {
    setUser(user);
  }

  function handleLogout()
  {
    setUser(null);
    localStorage.token = "";
  }

  return (
    <div className="App">
      <Router>
  
        <Switch>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/login">
            <LoginForm onLogin={handleLogin} />
          </Route>
          <Route path="/">
            {
              user ? 
              <div>
                <h1>Welcome back, {user.display_name}!</h1>
                <button onClick={handleLogout}>Log out</button>
              </div>
              :
              <h1>Welcome! Please <a href="/login">log in.</a></h1>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
