import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router";
import { Button, TextField } from "@material-ui/core";

import style from "../common/styles/form.module.css";

function PostFormContainer(props)
{

    function handleSubmit(response)
    {
        console.log(response);
    }

    return(
        <div>
            <Button variant="outlined">Make a post!</Button>
            {/* <PostForm onSubmitSuccess={handleSubmit}/> */}
        </div>
    )
}



export default PostFormContainer;