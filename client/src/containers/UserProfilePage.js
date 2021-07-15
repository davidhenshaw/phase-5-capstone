import { 
    Button, 
    makeStyles,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TextField,
    Typography,
    } from '@material-ui/core';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import UserAvatar from '../components/UserAvatar';
import Resizer from 'react-image-file-resizer';

import style from './../common/styles/profile.module.css';

const useStyles = makeStyles((theme) => ({
    root:{
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: theme.palette.grey.A100,
    },
    table: {
        backgroundColor: theme.palette.background.paper,
        width: 650,
        borderRadius: theme.shape.borderRadius * 2,
    },
  })
);
  


function UserProfilePage(props){

    let { user } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [tempUser, setTempUser] = useState(user);
    const [base64Img, setBase64Img] = useState(0);

    let classes = useStyles();

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
            <Typography>{tempUser[key]}</Typography>
        )
    }

    function generateInput(key, maxLines=1)
    {
        return(
            isEditMode ?
            <TextField multiline rows={maxLines} name={key} value={tempUser[key]} onChange={handleChange}/>
            :
            <Typography>{tempUser[key]}</Typography>
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

        if(base64Img){
            payload['avatar'] = base64Img;
        }

        axios.patch(`/users/${user.id}`, payload, config)
        .then( res => onSubmitSuccess(res.data) )
    }
    
    function onSubmitSuccess(newUser)
    {
        // console.log(newUser);
        setTempUser(newUser);
    }

    function onAvatarChange (event){
        console.log("file to upload:", event.target.files[0]);
        let file = event.target.files[0];
    
        if (file) {
            cacheImage(file);
        }
    }
    
    function onAvatarSubmit(event){
        event.preventDefault();
        setIsEditMode(false);

        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }

        let payload = {
            avatar: base64Img
        }

        axios.patch(`/users/${user.id}`, payload, config)
        .then( console.log )


        console.log("binary sTableRowing:", base64Img)
    }

    const cacheImage = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                128,
                128,
                "JPEG",
                100,
                0,
                (uri) => {
                    //resolve(uri);
                    console.log(uri);
                    setBase64Img(uri);
                },
                "base64"
            );
    });

    const table = () => {
        return(
            <form onSubmit={handleSubmit}>
                <TableContainer className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <th colSpan="2"> Account Info </th> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Display Name</TableCell>
                                <TableCell>
                                    {generateInput("display_name")}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>
                                    {generateInput("email")}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bio</TableCell>
                                <TableCell>
                                    {generateInput("bio", 3)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Twitter</TableCell>
                                <TableCell>
                                    {generateInput("twitter_name")}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Instagram</TableCell>
                                <TableCell>
                                    {generateInput("instagram_name")}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Youtube</TableCell>
                                <TableCell>
                                    {generateInput("youtube_name")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    isEditMode ?
                    <Button type="submit" variant="contained">Save</Button>
                    :
                    <Button variant="contained" onClick={handleEdit}>Edit</Button>
                }
            </form>
            )
    }

    const pictureForm = () => {
        return (
            <div>
                <form onChange={onAvatarChange} onSubmit={onAvatarSubmit}>
                    <input 
                    type="file"
                    name="image"
                    id="file"
                    accept=".jpeg, .png, .jpg"
                    />
                    {/* <input type="submit" /> */}
                </form>
                Preview:
                {
                    base64Img ?
                    <img alt="preview" src={base64Img}/>
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
            <div className={classes.header}>
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