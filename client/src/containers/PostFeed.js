import style from './../common/styles/form.module.css';
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
        <div>
            {posts.map( (post, idx) => <PostCard key={idx} post={post}/> )}
        </div>
    )
}

function PostCard(props)
{
    let { post } = props
    return(
        <div>
            <h1>{post.header}</h1>
            <h2></h2>
            <p>{post.message}</p>
        </div>
    )
}

export default PostFeed;