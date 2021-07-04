import style from './../common/styles/post.module.css';
import { 
    Button,
    Card, 
    Container,
    Collapse,
    Typography
} from '@material-ui/core';

import React, { useEffect, useState } from "react";
import axios from 'axios';

import PostForm from './../components/PostForm.js';

function PostFeed(props)
{
    let { user } = props;
    const [posts, setPosts] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
        <div className={style["post-form-container"]}>
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
            <Container component="div">
                <Typography variant="h4" component="h1">{post.header}</Typography>
                <Typography display="inline" variant="h6" component="h2">{post.user.username}</Typography>
            </Container>
            <p>{post.message}</p>
        </Card>
    )
}

export default PostFeed;