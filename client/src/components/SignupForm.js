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

        axios.post("/users", user)
        .then( console.log )
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
              <p>Already have an account? <a href={"/login"}>Log In!</a> </p>
          </form>
    )
}

export default SignupForm