import style from './../common/styles/form.module.css';
import React, { useEffect, useState } from "react";

import LoginForm from './../components/LoginForm';
import axios from 'axios';

function LoginPage(props)
{
    let { onLogin } = props;
    return(
        <div className={style["form-page"]}>
            <div className={style["form-header"]}>
                <h1>Welcome to Go-Lab!</h1>
                <h2>Let's get started!</h2>
            </div>
            <LoginForm onLogin={onLogin} />
        </div>
    )
}

export default LoginPage;