import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router";
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { Box, Container, TextField, Button } from "@material-ui/core";

import style from "../common/styles/form.module.css";

function LoginForm(props) {
    let { onLogin } = props;
    let history = useHistory();
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    })


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
        let payload = {user: userLogin}

        axios.post("/login", payload)
        .then( res => {
            localStorage.token = res.data.jwt
            onLogin( res.data.user )
            history.push("/")
        } )
    }

    return(
        <Box color="primary">
          <form onSubmit={handleSubmit} className={style["form-inline"]}>
            {generateFields(["text", "password"])}
            <Button type="submit" variant="contained">
                Log In!
            </Button>
          </form>
              <p>Don't have an account? <a href={"/signup"}>Sign Up!</a> </p>
        </Box>
    )
}

export default LoginForm