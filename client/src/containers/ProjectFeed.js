import style from './../common/styles/project.module.css';
import { 
    Card, 
    Container,
    Typography
} from '@material-ui/core';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ProjectFeed(props)
{
    let { id: category_id } = useParams();
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

        let path = category_id ? `/categories/${category_id}/projects` : "/projects"
        
        axios.get(path, config)
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
                <div className={style["project-container"]}>
                    {projects.map( (project, idx) => <ProjectCard key={idx} project={project}/> ).reverse()}
                </div>
            }
            {
                (!isLoading && projects.length <= 0) ?
                <h2>No projects in this category!</h2>
                :
                null
            }
        </div>
    )
}

function ProjectCard(props)
{
    let { project } = props;
    // let { avatar, username } = post.user;
    return(
        <Card raised={true} className={style["project-card"]}>
                <Container component="div" className="project-card-header"> 
                    <a href={`/projects/${project.id}`}>
                        <Typography variant="h4" component="h1">{project.name}</Typography>
                    </a>
                    <a href={`/categories/${project.category.id}`}>
                        <Typography display="inline" variant="h6" component="h2">{project.category.name}</Typography>
                    </a>
                </Container>
            <p>{project.header}</p>
        </Card>
    )
}

export default ProjectFeed;