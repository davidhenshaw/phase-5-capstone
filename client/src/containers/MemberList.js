import { React } from "react";
import UserSearchForm  from "../components/UserSearchForm";
import axios from "axios";

function MemberList(props) {
    let { members , onMemberAdd, onMemberRemove, project } = props;

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
            {members.map((member, idx) => <MemberCard onMemberRemove={handleMemberRemove} member={member} key={idx}/>)}
            <UserSearchForm 
                onMemberAdd={onMemberAdd}
                onMemberRemove={onMemberRemove}
                project={project} />
        </div>
    ) 
}

function MemberCard(props)
{
    let { member, onMemberRemove } = props;
    let { user } = member;
    return(
        <div>
            <h2>{user.display_name}</h2>
            <button onClick={()=>onMemberRemove(member)}> X </button>
        </div>
    )
}

export default MemberList