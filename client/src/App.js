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
import UserProfilePage from './containers/UserProfilePage';
import NavBar from './components/NavBar';

import { createMuiTheme, ThemeProvider , makeStyles} from '@material-ui/core'
import { purple } from '@material-ui/core/colors';
import ProjectForm from './components/ProjectForm';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#25CCF7'
      },
      secondary: {
        main: '#EAB543'
      },
    }
})

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      color: theme.palette.secondary.light,
  },
})
);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  useEffect( () => {
    //setIsLoading(true)
    autoLogin();
  }, []);

  function autoLogin()
  {
    let token = localStorage.token;
    if(!token) { return undefined }

    axios.post("/auto_login", {"token": token})
    .then(res => {
      setUser(res.data);
      console.log(res)
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err)
    })
  }

  const handleLogin = (user) => 
  {
    setUser(user);
  }

  function handleLogout()
  {
    setUser(null);
    localStorage.token = "";
  }

  if( isLoading )
  {
    // console.log(user);
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>

          <NavBar onLogout={handleLogout} user={user}/>

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
            <Route path="/categories/:id">
              <ProjectFeed user={user}/>
            </Route>
            <Route path="/categories">
              <CategoryPage user={user} />
            </Route>
            <Route path="/new-project">
              <ProjectForm user={user}/>
            </Route>
            <Route path="/profile">
              <UserProfilePage user={user}/>
            </Route>
            <Route path="/">
              {/* {
                user ? 
                <div>
                  <h1>Welcome back, {user.display_name}!</h1>
                </div>
                :
                <h1>Welcome! Please <a href="/login">log in.</a></h1>
              } */}
              <PostFeed user={user}/>
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
