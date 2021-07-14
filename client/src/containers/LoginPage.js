import style from './../common/styles/form.module.css';
import React from "react";

import LoginForm from './../components/LoginForm';
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
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        maxWidth: "1000px",
    },
}))

function LoginPage(props)
{
    let { onLogin } = props;
    let classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={style["form-header"]}>
                <h1>Welcome to Go-Lab!</h1>
                <h2>Let's get started!</h2>
            </div>
            <LoginForm onLogin={onLogin} />
        </div>
    )
}

export default LoginPage;