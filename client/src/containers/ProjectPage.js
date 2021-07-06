import style from './../common/styles/post.module.css';
import { 
    Card, 
    Container,
    Typography
} from '@material-ui/core';

import React, { useEffect, useState } from "react";
import axios from 'axios';


function ProjectPage(props)
{
    // let { user } = props;
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

      useEffect( () => {
            getProjects();
      },[]);

    function getProjects()
    {
        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        
        axios.get("/projects", config)
        .then( (res) => {
            setProjects(res.data)
            setIsLoading(false)
        });
    }


    return(
        <div className={style["post-feed"]}>
            {
                isLoading ?
                <h1>Loading...</h1>
                :
                <div className={style["post-container"]}>
                    {projects.map( (project, idx) => <ProjectCard key={idx} project={project}/> ).reverse()}
                </div>
            }
        </div>
    )
}

function ProjectCard(props)
{
    let { project } = props;
    // let { avatar, username } = post.user;
    return(
        <Card raised={true} className={style["post-card"]}>
            <Container component="div">
                <Typography variant="h4" component="h1">{project.name}</Typography>
                <Typography display="inline" variant="h6" component="h2">{project.category.name}</Typography>
            </Container>
            <p>{project.description}</p>
        </Card>
    )
}

export default ProjectPage;