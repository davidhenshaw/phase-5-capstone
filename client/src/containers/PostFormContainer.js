import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router";
import { Button, TextField } from "@material-ui/core";

import style from "../common/styles/form.module.css";

function PostFormContainer(props)
{

    function handleSubmit(response)
    {
        console.log(response);
    }

    return(
        <div>
            <Button variant="outlined">Make a post!</Button>
            <PostForm onSubmitSuccess={handleSubmit}/>
        </div>
    )
}

function PostForm(props){
    let { onSubmitSuccess } = props;
    const [post, setPost] = useState({
        header: "",
        message: ""
    })


    function handleChange(evt)
    {
        let {name, value} = evt.target;
        setPost({
            ...post,
            [name]: value
        })
    }

    function handleSubmit(evt)
    {
        evt.preventDefault();

        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        axios.post("/posts", post, config)
        .then( (res) => {
            onSubmitSuccess(res);
        } )
    }

    return(
        <form onSubmit={handleSubmit}>
            <TextField 
                placeholder="Post Title" 
                name="header" 
                value={post.header}
                onChange={handleChange}
                />
            <TextField 
                placeholder="What's up?" 
                name="message"
                rows={4} 
                multiline 
                variant="outlined" 
                value={post.message}
                onChange={handleChange}
                />
            <Button type="submit" variant="outlined">Post</Button>
        </form>
    )
}

export default PostFormContainer;