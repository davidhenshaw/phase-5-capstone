import {
    React,
    useEffect,
    useState
} from "react";

import {
    useHistory,
    useParams
} from "react-router-dom";

import axios from 'axios';
import MemberList from "./MemberList";
import { Button } from "@material-ui/core";
import ProjectForm from "../components/ProjectForm";

function ProjectPage(props)
{
    let {id} = useParams();
    const history = useHistory();
    const [project, setProject] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

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

    function handleDelete()
    {
        if( !window.confirm(`Are you sure you want to delete ${project.name} for all members? There's no going back!`))
            return;

        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        axios.delete(`/projects/${project.id}`, config)
        .then( res => {
            history.push("/");
            console.log(res);
        }).catch( err =>{
            console.log(err);
        })
    }

    function handleSave(newProject){
        setProject(newProject);
        setIsEditMode(false);
    }
    
    function handleCancelEdit()
    {
        setIsEditMode(false);
    }

    function handleEdit()
    {
        setIsEditMode(true);
    }

    const editorView = () => {
        return(
            isEditMode ? 
            <div>
                <ProjectForm onEdit={handleSave} projectEdit={project}/>
                <Button onClick={handleCancelEdit}>Cancel</Button>
            </div>
            :
            <Button variant="outlined" onClick={handleEdit}>Edit</Button>
        )
    }
    
    return(
        <div>
            <ProjectInfo project={project} />
            {
                project.is_member ? 
                editorView()
                :
                null
            }
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
            <br></br>
            <br></br>
            <br></br>
            {
                project.is_member ?
                <Button variant="outlined" onClick={handleDelete}>Delete Project</Button>
                :
                null
            }
        </div>
    )
}

function ProjectInfo( {project} )
{
    return(
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>
    )
}

export default ProjectPage