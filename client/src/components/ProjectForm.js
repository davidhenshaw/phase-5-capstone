import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, MenuItem, Select, TextField, makeStyles, InputLabel, FormControl } from "@material-ui/core";
import style from './../common/styles/form.module.css';
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2)
    },
    field:{
        margin: theme.spacing(3),
        minWidth: 120,
    }
  })
  );

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
    let classes = useStyles();

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
                return <MenuItem selected={true} value={category.id} key={idx}>{category.name}</MenuItem>
            }
            else{
                return <MenuItem value={category.id} key={idx}>{category.name}</MenuItem>
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
        <form onSubmit={handleSubmit} className={classes.root}>
            <TextField 
                className={classes.field}
                label="Project Name" 
                name="name" 
                value={project.name}
                onChange={handleChange}
                disabled={isLoading}
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                />
            <TextField 
                className={classes.field}
                label="Project Header" 
                name="header" 
                value={project.header}
                onChange={handleChange}
                disabled={isLoading}
                error={!!formErrors.header}
                helperText={formErrors.header}
                required
                />
            <FormControl className={classes.field}>
                <InputLabel>Category</InputLabel>
                <Select 
                    onChange={handleCategorySelect} 
                    required>
                    {generateCategoryOptions()}
                </Select>
            </FormControl>
            <TextField 
                className={classes.field}
                label="Description" 
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