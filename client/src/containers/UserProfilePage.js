import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import UserAvatar from '../components/UserAvatar';

import style from './../common/styles/profile.module.css';

function UserProfilePage(props){

    let { user } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [tempUser, setTempUser] = useState(user);
    const [base64Img, setBase64Img] = useState(0);

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

    function handleReaderLoad (readerEvt) {
        let binaryString = readerEvt.target.result;
        setBase64Img(btoa(binaryString));
    }

    function onChange (event){
        console.log("file to upload:", event.target.files[0]);
        let file = event.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = handleReaderLoad.bind(this);
    
          reader.readAsBinaryString(file);
        }
    }
    
    function onFileSubmit(event){
        event.preventDefault();

        let payload = {
            avatar: base64Img
        }

        axios.patch(`/users/${user.id}`, payload)
        .then( console.log )


        console.log("binary string:", base64Img)
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

    const pictureForm = () => {
        return (
            <div>
                <form onChange={onChange} onSubmit={onFileSubmit}>
                    <input 
                    type="file"
                    name="image"
                    id="file"
                    accept=".jpeg, .png, .jpg"
                    />
                    <input type="submit" />
                </form>
                Preview:
                {
                    base64Img ?
                    <img alt="image preview" width="600" height="auto" src={"data:image/png;base64," + base64Img}/>
                    :
                    null
                }
            </div>
        )
    }

    if( !user ){
        return null;
    }

    return(
        <div className={style["profile-page"]}>
            <div className={style["header"]}>
                {
                    isEditMode ?
                    pictureForm()
                    :
                    <UserAvatar user={user} />
                }
                <h1>{tempUser.username}</h1>
            </div>
            {table()}
        </div>
    )
}


export default UserProfilePage