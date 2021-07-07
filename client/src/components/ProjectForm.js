import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { Button, TextField } from "@material-ui/core";
import style from './../common/styles/form.module.css';

function ProjectForm(props){
    let { onSubmitSuccess } = props;
    const [project, setProject] = useState({
        name: "",
        category_id: 0,
        header: "",
        description: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    function handleChange(evt)
    {
        let {name, value} = evt.target;
        setProject({
            ...project,
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

        axios.post("/posts", project, config)
        .then( (res) => {
            onSubmitSuccess(res.data);
            setIsLoading(false);
            clearForm();
        } )
    }

    function clearForm()
    {
        setProject({
            header: "",
            description: ""
        })
    }

    return(
        <form onSubmit={handleSubmit} className={style["form-column-contained"]}>
            <TextField 
                placeholder="Post Title" 
                name="header" 
                value={project.header}
                onChange={handleChange}
                disabled={isLoading}
                />
            <TextField 
                placeholder="What's up?" 
                name="message"
                rows={4} 
                multiline 
                variant="outlined" 
                value={project.description}
                onChange={handleChange}
                disabled={isLoading}
                />
            <Button disabled={isLoading} type="submit" variant="outlined">Post</Button>
        </form>
    )
}

export default ProjectForm;