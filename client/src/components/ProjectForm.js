import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, TextField } from "@material-ui/core";
import style from './../common/styles/form.module.css';
import { useHistory } from "react-router";

function ProjectForm(props){
    const [project, setProject] = useState({
        name: "",
        category_id: 0,
        header: "",
        description: ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const history = useHistory();


    useEffect( () => {

        fetchCategories();

    } ,[])


    function fetchCategories(){
        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        axios.get("/categories", config)
        .then(res => {
            setCategories(res.data)
        })
    }

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

        let payload = {"project": project}

        axios.post("/projects", payload, config)
        .then( (res) => {
            onSubmitSuccess(res.data);
            console.log(res);
            setIsLoading(false);
            clearForm();
        } ).catch( err => {
            setIsLoading(false);
            clearForm();
        })
    }

    function onSubmitSuccess(project)
    {
        history.push(`/projects/${project.id}`);
    }

    function clearForm()
    {
        setProject({
            name: "",
            category_id: 0,
            header: "",
            description: ""
        })
    }

    function generateCategoryOptions()
    {
        return categories.map( (category) => <option value={category.id}>{category.name}</option>)
    }

    function handleCategorySelect(evt)
    {
        setProject({ 
            ...project,
            "category_id": evt.target.value 
        })
    }

    return(
        <form onSubmit={handleSubmit} className={style["form-column-contained"]}>
            <TextField 
                placeholder="Project Name" 
                name="name" 
                value={project.name}
                onChange={handleChange}
                disabled={isLoading}
                />
            <TextField 
                placeholder="Project Header" 
                name="header" 
                value={project.header}
                onChange={handleChange}
                disabled={isLoading}
                />
            <select onChange={handleCategorySelect} required>
                <option value="">--Choose a Category--</option>
                {generateCategoryOptions()}
            </select>
            <TextField 
                placeholder="Description" 
                name="description"
                rows={4} 
                multiline 
                variant="outlined" 
                value={project.description}
                onChange={handleChange}
                disabled={isLoading}
                />
            <Button disabled={isLoading} type="submit" variant="contained">Create Project!</Button>
        </form>
    )
}

export default ProjectForm;