import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import UserAvatar from '../components/UserAvatar';

import style from './../common/styles/profile.module.css';

function UserProfilePage(props){

    let { user } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [tempUser, setTempUser] = useState(user);

    function handleChange(evt)
    {
        setTempUser({
            ...tempUser,
            [evt.target.name]: evt.target.value
        })
    }

    function generateInput(key)
    {
        return(
            isEditMode ?
            <TextField name={key} value={tempUser[key]} onChange={handleChange}/>
            :
            tempUser[key]
        )
    }

    function handleEdit(e)
    {
        e.preventDefault();
        setIsEditMode(true);
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        setIsEditMode(false);

        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        let payload = tempUser;

        axios.patch(`/users/${user.id}`, payload, config)
        .then( res => onSubmitSuccess(res.data) )
    }
    
    function onSubmitSuccess(newUser)
    {
        // console.log(newUser);
        setTempUser(newUser);
    }

    const table = () => {
        return(
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2"> Account Info </th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Display Name</td>
                            <td>
                                {generateInput("display_name")}
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                {generateInput("email")}
                            </td>
                        </tr>
                        <tr>
                            <td>Bio</td>
                            <td>
                                {generateInput("bio")}
                            </td>
                        </tr>
                        <tr>
                            <td>Twitter</td>
                            <td>
                                {generateInput("twitter_name")}
                            </td>
                        </tr>
                        <tr>
                            <td>Instagram</td>
                            <td>
                                {generateInput("instagram_name")}
                            </td>
                        </tr>
                        <tr>
                            <td>Youtube</td>
                            <td>
                                {generateInput("youtube_name")}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {
                    isEditMode ?
                    <Button type="submit" variant="outlined">Save</Button>
                    :
                    <Button variant="outlined" onClick={handleEdit}>Edit</Button>
                }
            </form>
            )
    }

    if( !user ){
        return null;
    }

    return(
        <div className={style["profile-page"]}>
            <div className={style["header"]}>
                <UserAvatar user={user} />
                <h1>{tempUser.username}</h1>
            </div>
            {table()}
        </div>
    )
}


export default UserProfilePage