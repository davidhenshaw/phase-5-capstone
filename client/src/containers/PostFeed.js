import style from './../common/styles/post.module.css';
import { 
    Card, 
    Typography,
    Container
} from '@material-ui/core';

import React, { useEffect, useState } from "react";
import axios from 'axios';

function PostFeed(props)
{
    let { user } = props;
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        axios.get("/posts")
        .then(res => setPosts(res.data))
    
      },[]);

    return(
        <div className={style["post-container"]}>
            {posts.map( (post, idx) => <PostCard key={idx} post={post}/> )}
        </div>
    )
}

function PostCard(props)
{
    let { post } = props;
    let { avatar, username } = post.user;
    return(
        <Card raised={true} className={style["post-card"]}>
            <Container component="div">
                <Typography variant="h4" component="h1">{post.header}</Typography>
                <Typography display="inline" variant="subtitle1" component="h2">{post.user.username}</Typography>
            </Container>
            <p>{post.message}</p>
        </Card>
    )
}

export default PostFeed;