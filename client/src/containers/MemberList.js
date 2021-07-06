import { React } from "react";
import UserSearchForm  from "../components/UserSearchForm";

function MemberList(props) {
    let { members , onMemberAdd, onMemberRemove, project } = props;


    return(
        <div>
            {members.map((member, idx) => <MemberCard onMemberRemove={onMemberRemove} member={member} key={idx}/>)}
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
    return(
        <div>
            <h2>{member.display_name}</h2>
            <button onClick={()=>onMemberRemove(member)}> X </button>
        </div>
    )
}

export default MemberList