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
            // console.log(res.data)
            setProject(res.data)
            setIsLoading(false)
        });
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
            <UserSearchForm project={project}/>
        </div>
    )
}

function MemberList(props)
{
    let { members } = props;

    let memberCard = (data, idx) => {
        return (
            <h2 key={idx}>{data.display_name}</h2>
        )
    }

    return members.map((member, idx) => memberCard(member, idx))
}

function UserSearchForm(props)
{
    let {project} = props;
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
        
        axios.get(`/user/${username}`, config)
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
        .then( console.log )

        clearForm();
        clearUser();
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