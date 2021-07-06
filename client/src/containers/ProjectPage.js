import {
    React,
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import axios from 'axios';
import MemberList from "./MemberList";
import UserSearchForm from "../components/UserSearchForm";

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
            // console.log(res.data)
            setProject(res.data)
            setIsLoading(false)
        });
    }

    function handleMemberAdd(member)
    {
        console.log(member);
        setProject({
                "users": [...project["users"], member]
            })
    }

    function handleMemberRemove(member)
    {
        let idx = project.users.indexOf(member);
        let newList = project.users.filter( user => user != member);

        setProject({
            "users": newList
        })
    }
    
    return(
        <div>
            <h1>ProjectPage</h1>
            {
                isLoading ? 
                <h2>Loading...</h2>
                :
                <MemberList
                    project={project}
                    onMemberAdd={handleMemberAdd}
                    onMemberRemove={handleMemberRemove}
                    members={project.users} /> 
            }
        </div>
    )
}

export default ProjectPage