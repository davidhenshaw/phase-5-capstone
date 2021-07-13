import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, TextField } from "@material-ui/core";
import style from './../common/styles/form.module.css';
import { useHistory } from "react-router";

function ProjectForm(props)
{
    //This is an existing project that is being edited
    let { projectEdit, onEdit } = props;

    const [project, setProject] = useState({
        name: "",
        category_id: 0,
        header: "",
        description: ""
    })

    const [formErrors, setFormErrors] = useState({
        name: "",
        category_id: "",
        header: "",
        description: ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const history = useHistory();


    useEffect( () => {

        fetchCategories();

        if( projectEdit )
        {
            //Prefill the form with the existing project info if it has one
            setProject( projectEdit );
        }

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

        if (projectEdit)
        {   //If you're using this component as a patch
            axios.patch(`/projects/${projectEdit.id}`, payload, config)
            .then( (res) => {
                onEdit(res.data);
                console.log(res);
                setIsLoading(false);
                clearForm();
            } ).catch( err => {
                setIsLoading(false);
                clearForm();
            })
        }
        else
        {   //If you're using this component as a post
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
        return categories.map( (category, idx) => {
            if( projectEdit && category.id == projectEdit.category.id ){
                return <option selected={true} value={category.id} key={idx}>{category.name}</option>
            }
            else{
                return <option value={category.id} key={idx}>{category.name}</option>
            }
        })
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
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                />
            <TextField 
                placeholder="Project Header" 
                name="header" 
                value={project.header}
                onChange={handleChange}
                disabled={isLoading}
                error={!!formErrors.header}
                helperText={formErrors.header}
                required
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
                {
                    projectEdit ?
                    <Button disabled={isLoading} type="submit" variant="contained">Save</Button>
                    :
                    <Button disabled={isLoading} type="submit" variant="contained">Create Project!</Button>
                }
        </form>
    )
}

export default ProjectForm;