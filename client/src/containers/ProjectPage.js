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
import { 
    Button, 
    Container,
    Divider,
    makeStyles,
    Typography,
} from "@material-ui/core";
import ProjectForm from "../components/ProjectForm";

import style from '../common/styles/project.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
    },
    header:{
        textAlign: "left",
        marginBottom: theme.spacing(1),
    },
    title: {
        textAlign: 'left',
    },
    body: {
        textAlign: 'left',
        overflowY: 'auto',
        maxHeight: "15rem",
        marginBottom: theme.spacing(2),
    },
    section: {
        // float: "left",
        margin: theme.spacing(3),
        width: "80%",
        // border: "1px solid",
    },
    smallSection: {
        
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 5fr",
        marginBottom: theme.spacing(2),
    }
  })
);

function ProjectPage(props)
{
    let {id} = useParams();
    const history = useHistory();
    const [project, setProject] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    let classes = useStyles();

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
        <Container className={classes.root}>
            <ProjectInfo project={project} />
            <Divider variant="middle" />
            {
                project.is_member ? 
                editorView()
                :
                null
            }
            <div className={classes.grid}>
                {
                    isLoading ? 
                    <h2>Loading...</h2>
                    :
                    <Container className={classes.smallSection}>
                        <MemberList
                            writePermission={project.is_member}
                            project={project}
                            onMemberAdd={handleMemberAdd}
                            onMemberRemove={handleMemberRemove}
                            members={project.members} />
                    </Container>
                }
                <Container className={classes.section}>
                    <Typography variant="h4" className={classes.title}>
                        Description
                    </Typography>
                    <Typography variant="body1" className={classes.body}>
                        {project.description}
                    </Typography>
                </Container>
            </div> 
            {
                project.is_member ?
                <Button variant="outlined" onClick={handleDelete}>Delete Project</Button>
                :
                null
            }
        </Container>
    )
}

function ProjectInfo( {project} )
{
    let classes = useStyles();

    return(
        <Container className={classes.header}>
            <Typography variant="h2">{project.name}</Typography>
            <Typography variant="body1">{project.header}</Typography>
        </Container>
    )
}

export default ProjectPage