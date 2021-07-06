import { React, useState } from "react";
import axios from 'axios';

function UserSearchForm(props) {
    let { project, onMemberAdd, onMemberRemove } = props;
    let [username, setUsername] = useState("");
    let [user, setUser] = useState();

    function clearForm() {
        setUsername("");
    }

    function clearUser() {
        setUser(null);
    }

    function handleChange(e) {
        setUsername(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        };

        axios.post(`/get_user`, { "username": username }, config)
            .then((res) => setUser(res.data));
    }

    function addToProject() {
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        };

        let payload = {
            "user_id": user.id,
            "project_id": project.id
        };

        axios.post("/members", { "member": payload }, config)
            .then(res => {
                console.log(res.data)
                if (res.status === 201) {
                    onMemberAdd(res.data);
                    clearForm();
                    clearUser();
                }
            })
            .catch(err => console.log(err.response.data));
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={username} />
                <button>Search</button>
            </form>
            {user ?
                <div>
                    {user.username}
                    <button onClick={addToProject}>Add To Project</button>
                    <button onClick={clearUser}>X</button>
                </div>
                :
                null}
        </div>
    );
}

export default UserSearchForm