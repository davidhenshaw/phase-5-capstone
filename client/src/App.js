import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';

import SignupPage from './containers/SignupPage';
import LoginPage from './containers/LoginPage';
import PostFeed from './containers/PostFeed';
import ProjectFeed from './containers/ProjectFeed';
import ProjectPage from './containers/ProjectPage';
import CategoryPage from './containers/CategoryPage';

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
            <SignupPage />
          </Route>
          <Route path="/login">
            <div className="Form-page">
              <LoginPage onLogin={handleLogin} />
            </div>
          </Route>
          <Route path="/projects/:id">
            <ProjectPage user={user}/>
          </Route>
          <Route path="/projects">
            <ProjectFeed user={user}/>
          </Route>
          <Route path="/categories">
            <CategoryPage user={user} />
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
            {/* <PostFormContainer /> */}
            <PostFeed user={user}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
