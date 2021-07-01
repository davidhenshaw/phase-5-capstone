import React from "react";
import { useState } from 'react';
import axios from 'axios'

function LoginForm() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    function handleChange(evt)
    {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value
        })
    }

    function generateFields(types = [])
    {
        if (types)
        {
            return Object.keys(user).map( (key, idx) => 
                <input type={types[idx]} placeholder={key.split("_").join(" ")} name={key} value={user[key]} onChange={handleChange} key={idx} /> 
            )
        }
        else
        {
            return Object.keys(user).map( (key, idx) => 
                <input placeholder={key.toUpperCase()} name={key} value={user[key]} onChange={handleChange} key={idx} /> 
            )
        }
    }

    function handleSubmit(evt)
    {
        evt.preventDefault();

        axios.get("/login", user)
        .then( console.log )
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