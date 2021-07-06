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
        let newList = project.splice(idx, 1);

        setProject({
            "users": newList,
            ...project
        })
    }
    
    return(
        <div>
            <h1>ProjectPage</h1>
            {
                isLoading ? 
                <h2>Loading...</h2>
                :
                <MemberList members={project.users} /> 
            }
            <UserSearchForm 
                onMemberAdd={handleMemberAdd}
                onMemberRemove={handleMemberRemove}
                project={project}/>
        </div>
    )
}

function UserSearchForm(props)
{
    let {project, onMemberAdd, onMemberRemove} = props;
    let [username, setUsername] = useState("");
    let [user, setUser] = useState();

    function clearForm()
    {
        setUsername("")
    }

    function clearUser()
    {
        setUser(null)
    }

    function handleChange(e)
    {
        setUsername(e.target.value)
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        
        axios.post(`/get_user`, {"username": username}, config)
        .then( (res) => setUser(res.data) )
    }

    function addToProject()
    {
        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        let payload = {
            "user_id": user.id,
            "project_id": project.id
        }

        axios.post("/members", {"member": payload}, config)
        .then( res => {

            if(res.status === 201)
            {
                onMemberAdd(user);
                clearForm()
                clearUser()
            }
        })
        .catch(err => console.log(err.response.data))
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Username" 
                    name="username" 
                    onChange={handleChange} 
                    value={username} />
                <button>Search</button>
            </form>            
            {
                user ? 
                <div>
                    {user.username}
                    <button onClick={addToProject}>Add To Project</button>
                    <button onClick={clearUser}>X</button>
                </div>
                :
                null
            }
        </div>
    )
}

export default ProjectPage