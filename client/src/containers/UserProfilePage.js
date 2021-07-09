import { React, useEffect } from 'react';
import style from './../common/styles/profile.module.css';

function UserProfilePage(props){

    let { user } = props;



    return(
        <div className={style["profile-page"]}>
            <h1>{user.username}</h1>
            <table>
                <thead>
                    <tr>
                       <th colspan="2"> Account Info </th> 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Display Name</td>
                        <td>{user.display_name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Bio</td>
                        <td>{user.bio}</td>
                    </tr>
                    <tr>
                        <td>Twitter</td>
                        <td>{user.twitter_name}</td>
                    </tr>
                    <tr>
                        <td>Instagram</td>
                        <td>{user.instagram_name}</td>
                    </tr>
                    <tr>
                        <td>Youtube</td>
                        <td>{user.youtube_name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserProfilePage