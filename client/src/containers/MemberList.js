import { React } from "react";
import UserSearchForm  from "../components/UserSearchForm";
import axios from "axios";

function MemberList(props) {
    let { members , onMemberAdd, onMemberRemove, project, writePermission } = props;

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
        <div>
            <h2>Collaborators:</h2>
            {}
            {members.map((member, idx) => <MemberCard writePermission={writePermission} onMemberRemove={handleMemberRemove} member={member} key={idx}/>)}
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
    return(
        <div>
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