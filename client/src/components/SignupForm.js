import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { Box, TextField, Button } from "@material-ui/core";

import style from './../common/styles/form.module.css'

function SignupForm() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        retype_password: "",
        email: "",
        display_name: ""
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
                <div className={style['form-column-input']}> 
                    <TextField className={style['form-column-input']} type={types[idx]} placeholder={key.split("_").join(" ")} name={key} value={user[key]} onChange={handleChange} key={idx} /> 
                </div>
            )
        }
        else
        {
            return Object.keys(user).map( (key, idx) =>
                <div className={style['form-column-input']}> 
                    <TextField className={style['form-column-input']} placeholder={key.toUpperCase()} name={key} value={user[key]} onChange={handleChange} key={idx} /> 
                </div>
            )
        }
    }

    function passwordMatch()
    {
        return user.password === user.retype_password;
    }

    function handleSubmit(evt)
    {
        evt.preventDefault();

        if( !passwordMatch() )
        {
            alert("Passwords do not match, please try again.")
        }

        axios.post("/users", user)
        .then( console.log )
    }

    return(
        <Box variant="color">
          <form onSubmit={handleSubmit} className={style["form-column"]}>
              {/* <input placeholder="Username" name="username" value={user.username} onChange={handleChange} /> 
              <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} /> 
              <input type="password" placeholder="Re-type password" name="password" value={retypePasswd} onChange={handlePasswordChange} /> 
              <input placeholder="Email" name="email" value={user.email} onChange={handleChange} /> 
              <input placeholder="Display Name" name="display_name" value={user.display_name} onChange={handleChange} />  */}
              {generateFields(["text", "password", "password", "text", "text"])}
              <Button type='submit' variant='contained'>Sign Up!</Button>
              <p>Already have an account? <a href={"/login"}>Log In!</a> </p>
          </form>
        </Box>
    )
}

export default SignupForm