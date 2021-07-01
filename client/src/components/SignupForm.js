import React from "react";
import { useState } from 'react';
import axios from 'axios'

function SignupForm() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        display_name: ""
    })

    const [retypePasswd, setRetypePasswd] = useState("");

    function handleChange(evt)
    {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value
        })
    }

    function handlePasswordChange(evt)
    {
        setRetypePasswd(evt.target.value)
    }

    function generateFields(types = [])
    {
        if (types)
        {
            return Object.keys(user).map( (key, idx) => 
                <input type={types[idx]} placeholder={key.split("_").join(" ")} name={key} value={user[key]} onChange={handleChange} /> 
            )
        }
        else
        {
            return Object.keys(user).map( (key) => 
                <input placeholder={key.toUpperCase()} name={key} value={user[key]} onChange={handleChange} /> 
            )
        }
    }

    function handleSubmit(evt)
    {
        evt.preventDefault();
    }

    return(
          <form onSubmit={handleSubmit}>
              {/* <input placeholder="Username" name="username" value={user.username} onChange={handleChange} /> 
              <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} /> 
              <input type="password" placeholder="Re-type password" name="password" value={retypePasswd} onChange={handlePasswordChange} /> 
              <input placeholder="Email" name="email" value={user.email} onChange={handleChange} /> 
              <input placeholder="Display Name" name="display_name" value={user.display_name} onChange={handleChange} />  */}
              {generateFields(["text", "password","text", "text"])}
              <button>Sign Up!</button>
          </form>
    )
}

export default SignupForm