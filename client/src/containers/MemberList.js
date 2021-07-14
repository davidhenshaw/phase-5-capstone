import { React } from "react";
import UserSearchForm  from "../components/UserSearchForm";
import axios from "axios";

import style from '../common/styles/project.module.css'
import { ListItem, ListItemAvatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        float: "left",
        textAlign: "left",
        backgroundColor: theme.palette.grey[400],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        maxWidth: "400px",
        maxHeight: "400px",
    },
    card:{

    },
    sectionTitle:{

    }
  })
);

function MemberList(props) {
    let { members , onMemberAdd, onMemberRemove, project, writePermission } = props;
    let classes = useStyles();

    function handleMemberRemove(member)
    {
        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        
        axios.delete(`/members/${member.id}`, config)
        .then( (res) => {
            console.log(res)
            onMemberRemove(member)
        });
    }

    return(
        <div className={classes.root}>
            <h2>Collaborators:</h2>
            {}
            {
                members.map((member, idx) => {
                    return (
                    <ListItem>
                        <MemberCard writePermission={writePermission} onMemberRemove={handleMemberRemove} member={member} key={idx}/>
                    </ListItem>
                    )
                })
            }
            {
                writePermission ? 
                <UserSearchForm 
                    onMemberAdd={onMemberAdd}
                    onMemberRemove={onMemberRemove}
                    project={project} />
                    :
                    null
            }
        </div>
    ) 
}

function MemberCard(props)
{
    let { member, onMemberRemove, writePermission } = props;
    let { user } = member;
    let classes = useStyles();

    return(
        <div className={style["member-card"]}>
            <h3>{user.display_name}</h3>
            {
                writePermission ?
                <button onClick={()=>onMemberRemove(member)}> X </button>
                :
                null
            }
        </div>
    )
}

export default MemberList