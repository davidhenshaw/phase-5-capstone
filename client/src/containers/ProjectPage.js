import {
    React,
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import axios from 'axios';

function ProjectPage(props)
{
    let {id} = useParams();
    const [project, setProject] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect( fetchProject, [] );

    function fetchProject()
    {
        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        
        axios.get(`/projects/${id}`, config)
        .then( (res) => {
            console.log(res.data)
            setProject(res.data)
            setIsLoading(false)
        });
    }
    
    return(
        <h1>ProjectPage</h1>
    )
}

function MemberView()
{

}

export default ProjectPage