import { React } from "react";

function MemberList(props) {
    let { members } = props;

    let memberCard = (data, idx) => {
        return (
            <h2 key={idx}>{data.display_name}</h2>
        );
    };

    return members.map((member, idx) => memberCard(member, idx));
}

export default MemberList