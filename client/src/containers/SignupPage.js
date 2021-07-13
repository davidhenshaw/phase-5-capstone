import style from './../common/styles/form.module.css';
import React from "react";

import SignupForm from './../components/SignupForm';

function SignupPage(props)
{
    return(
        <div className={style["form-page"]}>
            <div className={style["form-header"]}>
                <h1>Create an account!</h1>
            </div>
            <SignupForm />
        </div>
    )
}

export default SignupPage;