import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router";
import { Box, TextField, Button, Typography } from "@material-ui/core";

import style from "../common/styles/form.module.css";

function LoginForm(props) {
    let { onLogin } = props;
    let history = useHistory();
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")


    function handleChange(evt)
    {
        setUserLogin({
            ...userLogin,
            [evt.target.name]: evt.target.value
        })
    }

    function generateFields(types = [])
    {
        if (types)
        {
            return Object.keys(userLogin).map( (key, idx) => 
                <TextField type={types[idx]} placeholder={key.split("_").join(" ")} name={key} value={userLogin[key]} onChange={handleChange} key={idx} /> 
            )
        }
        else
        {
            return Object.keys(userLogin).map( (key, idx) => 
                <TextField placeholder={key.toUpperCase()} name={key} value={userLogin[key]} onChange={handleChange} key={idx} /> 
            )
        }
    }

    function handleSubmit(evt)
    {
        evt.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        
        let payload = {user: userLogin}

        axios.post("/login", payload)
        .then( res => {
            localStorage.token = res.data.jwt
            onLogin( res.data.user )
            setIsLoading( false );
            history.push("/")
        } ).catch( err => {
            setIsLoading(false);
            setErrorMessage(err.response.data.message)
        })
    }

    return(
        <Box color="primary">
          <form onSubmit={handleSubmit} className={style["form-inline"]}>
            {generateFields(["text", "password"])}
            <Button 
                type="submit" 
                variant="contained"
                disabled={isLoading}
                >
                Log In!
            </Button>
          </form>
          <Box color="error.main">
          {
              errorMessage ? 
              <Typography>{errorMessage}</Typography>
              :
              null
          }
          </Box>
              <p>Don't have an account? <a href={"/signup"}>Sign Up!</a> </p>
        </Box>
    )
}

export default LoginForm