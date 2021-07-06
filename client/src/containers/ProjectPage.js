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
            setProject(res.data)
            setIsLoading(false)
        });
    }

    function handleMemberAdd(member)
    {
        console.log(member);
        setProject({
                ...project,
                "members": [...project["members"], member]
            })
    }

    function handleMemberRemove(removedMember)
    {
        let newList = project.members.filter( member => member.id != removedMember.id);

        setProject({
            ...project,
            "members": newList
        })
    }
    
    return(
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {
                isLoading ? 
                <h2>Loading...</h2>
                :
                <MemberList
                    writePermission={project.is_member}
                    project={project}
                    onMemberAdd={handleMemberAdd}
                    onMemberRemove={handleMemberRemove}
                    members={project.members} /> 
            }
        </div>
    )
}

export default ProjectPage