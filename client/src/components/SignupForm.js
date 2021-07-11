import React from "react";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setError] = useState({});

    const history = useHistory();


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
        setIsLoading(true);
        setError({});

        if( !passwordMatch() )
        {
            alert("Passwords do not match, please try again.")
            return
        }

        axios.post("/users", user)
        .then( res => { 
            setIsLoading(false);
            clearForm();
            history.push("/login")
        })
        .catch( err => {
            setIsLoading(false);
            console.log(err.response);
            setError(err.response.data);
        })
    }

    function clearForm()
    {
        setUser({
            username: "",
            password: "",
            retype_password: "",
            email: "",
            display_name: ""
        })
    }

    function displayErrors( key )
    {
        if( errors[key] ){
            return errors[key].map( msg => <p>{key}: {msg}</p>)
        }
    }

    return(
        <Box variant="color">
          <form onSubmit={handleSubmit} className={style["form-column"]}>
              {generateFields(["text", "password", "password", "text", "text"])}
              {
                  errors ? 
                  displayErrors("username")
                  :
                  null
              }
              <Button
                disabled={isLoading} 
                type='submit' 
                variant='contained'>
                    Sign Up!
                </Button>
              <p>Already have an account? <a href={"/login"}>Log In!</a> </p>
          </form>
        </Box>
    )
}

export default SignupForm