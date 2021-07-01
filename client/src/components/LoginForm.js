import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router";

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
                <input type={types[idx]} placeholder={key.split("_").join(" ")} name={key} value={userLogin[key]} onChange={handleChange} key={idx} /> 
            )
        }
        else
        {
            return Object.keys(userLogin).map( (key, idx) => 
                <input placeholder={key.toUpperCase()} name={key} value={userLogin[key]} onChange={handleChange} key={idx} /> 
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
          <form onSubmit={handleSubmit}>
              {generateFields(["text", "password"])}
              <button>Log In!</button>
              <p>Don't have an account? <a href={"/signup"}>Sign Up!</a> </p>
          </form>
    )
}

export default LoginForm