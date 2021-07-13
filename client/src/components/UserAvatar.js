import { Avatar } from '@material-ui/core';
import React from "react";

function UserAvatar(props) {
    let { user } = props;
    let { avatar } = props.user;

    const userInitials = () => {
        let names = user.display_name.split(" ");
        let initials = names.map(name => name.toUpperCase().charAt(0));
        return initials.join("");
    };

    return (
        avatar ?
            <Avatar src={avatar} />
            :
            <Avatar>{userInitials()}</Avatar>
    );
}

export default UserAvatar