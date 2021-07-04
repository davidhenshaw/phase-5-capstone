import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { Button, TextField } from "@material-ui/core";
import style from './../common/styles/form.module.css';

function PostForm(props){
    let { onSubmitSuccess } = props;
    const [post, setPost] = useState({
        header: "",
        message: ""
    })

    const [isLoading, setIsLoading] = useState(false);


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
        setIsLoading(true);

        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        axios.post("/posts", post, config)
        .then( (res) => {
            onSubmitSuccess(res.data);
            setIsLoading(false);
            clearForm();
        } )
    }

    function clearForm()
    {
        setPost({
            header: "",
            message: ""
        })
    }

    return(
        <form onSubmit={handleSubmit} className={style["form-column-contained"]}>
            <TextField 
                placeholder="Post Title" 
                name="header" 
                value={post.header}
                onChange={handleChange}
                disabled={isLoading}
                />
            <TextField 
                placeholder="What's up?" 
                name="message"
                rows={4} 
                multiline 
                variant="outlined" 
                value={post.message}
                onChange={handleChange}
                disabled={isLoading}
                />
            <Button disabled={isLoading} type="submit" variant="outlined">Post</Button>
        </form>
    )
}

export default PostForm;