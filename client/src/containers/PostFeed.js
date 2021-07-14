import style from './../common/styles/post.module.css';
import { 
    Box,
    Button,
    Card, 
    Container,
    Collapse,
    Divider,
    makeStyles,
    Typography,
} from '@material-ui/core';

import React, { useEffect, useState } from "react";
import axios from 'axios';

import PostForm from './../components/PostForm.js';
import UserAvatar from '../components/UserAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.text.secondary,
    },
    leftFloat: {
        float: "left",
        position: "fixed",
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(12) * -1,
        padding: theme.spacing(1),
        width: "500px",
        borderRadius: theme.shape.borderRadius * 2,
        backgroundColor: theme.palette.background.default,
    }
  })
  );

function PostFeed(props)
{
    let { user } = props;
    const [posts, setPosts] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let classes = useStyles();

    useEffect( () => {
        axios.get("/posts")
        .then(res => 
            setPosts(res.data));
            setIsLoading(false);
      },[]);

    function handleSubmitSuccess(post)
    {
        setPosts([...posts, post]);
    }

    function toggleFormOpen()
    {
        setFormOpen((prev) => !prev);
    }
    
    const postSection = (
        <div className={classes.leftFloat}>
            <Button variant="outlined" onClick={toggleFormOpen}>
                {formOpen ? "Close" : "Make a Post!"}
            </Button>
            <Collapse 
                in={formOpen}
            >
                <PostForm onSubmitSuccess={handleSubmitSuccess} />
            </Collapse>
        </div>
    );

    return(
        <div className={style["post-feed"]}>
            {
                user ? 
                postSection
                :
                null
            }
            
            {
                isLoading ?
                <h1>Loading...</h1>
                :
                <div className={style["post-container"]}>
                    {posts.map( (post, idx) => <PostCard key={idx} post={post}/> ).reverse()}
                </div>
            }
        </div>
    )
}

function PostCard(props)
{
    let { post } = props;
    // let { avatar, username } = post.user;
    return(
        <Card raised={true} className={style["post-card"]}>
            <Box className={style["avatar"]}>
                <UserAvatar user={post.user}/>
            </Box>
            <Box className={style["post-header"]}>
                <Typography variant="h5" component="h1">{post.header}</Typography>
                <Typography variant="subtitle2" component="h2">{post.user.username}</Typography>
            </Box>
            <Typography variant="body1">{post.message}</Typography>
        </Card>
    )
}

export default PostFeed;