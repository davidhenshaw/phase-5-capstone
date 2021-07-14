import style from './../common/styles/form.module.css';
import React from "react";

import SignupForm from './../components/SignupForm';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "solid",
        borderRadius: theme.shape.borderRadius * 2,
        backgroundColor: theme.palette.background.paper,
        maxWidth: "1000px",
    },
}))


function SignupPage(props)
{

    let classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={style["form-header"]}>
                <h1>Create an account!</h1>
            </div>
            <SignupForm />
        </div>
    )
}

export default SignupPage;