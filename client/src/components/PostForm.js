import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { Button, TextField, makeStyles} from "@material-ui/core";
import style from './../common/styles/form.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.text.secondary,
    },
  })
  );

function PostForm(props)
{
    let classes = useStyles();
    let { onSubmitSuccess } = props;
    const [post, setPost] = useState({
        header: "",
        message: ""
    })

    const [formError, setFormError] = useState({
        header: false,
        message: false
    })

    const [formHelperText, setFormHelperText] = useState({
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
        if(! validate())
        {
            return
        }


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
        .catch( handleServerError )
    }

    function handleServerError(err)
    {
        console.log(err.response);
    }

    function clearForm()
    {
        setPost({
            header: "",
            message: ""
        })
    }

    function validate()
    {
        let didPass = true;
        //Reset errors
        setFormError({
            header: false,
            message: false
        })
    
        setFormHelperText({
            header: "",
            message: ""
        })

        //Check for blank fields
        Object.keys(post).forEach( key => {
           if (! post[key])
           {
               didPass = false
               setFormError({
                   ...formError,
                   [key]: true
               })
               setFormHelperText({
                   ...formHelperText,
                   [key]: "Cannot be blank"
               })
           }
        })

        return didPass
    }

    return(
        <form onSubmit={handleSubmit} className={style["form-column-contained"]}>
            <TextField 
                placeholder="Post Title" 
                name="header" 
                value={post.header}
                onChange={handleChange}
                disabled={isLoading}
                error={formError.header}
                helperText={formHelperText.header}
                variant="filled"
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
                error={formError.message}
                helperText={formHelperText.message}
                variant="filled"
                />
            <Button disabled={isLoading} type="submit" variant="contained">Post</Button>
        </form>
    )
}

export default PostForm;