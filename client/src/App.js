import logo from './logo.svg';
import './App.css';
import { React, useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [base64Img, setBase64Img] = useState(0);
  const [users, setUsers] = useState([]);

  function handleReaderLoad (readerEvt) {
    let binaryString = readerEvt.target.result;
    setBase64Img(btoa(binaryString));
  }

  function onChange (event){
    console.log("file to upload:", event.target.files[0]);
    let file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = handleReaderLoad.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  function onFileSubmit(event){
    event.preventDefault();

    let payload = {
      avatar: base64Img
    }

    axios.patch(`/users/${users[0].id}`, payload)
    .then( console.log )


    console.log("binary string:", base64Img)
  }

  function displayUsers(users)
  {
    return users.map( (user, idx) => <User key={idx} userData={user} />)
  }

  useEffect( () => {
    axios.get("/users")
    .then( res => setUsers(res.data))
  }, [])

  return (
    <div className="App">
      <form onChange={onChange} onSubmit={onFileSubmit}>
        <input 
          type="file"
          name="image"
          id="file"
          accept=".jpeg, .png, .jpg"
        />
        <input type="submit" />
      </form>
      Preview:
      {
        base64Img ?
        <img alt="image preview" width="600" height="auto" src={"data:image/png;base64," + base64Img}/>
        :
        null
      }
      {
        users ? 
        displayUsers(users)
        :
        null
      }
    </div>
  );
}

function User(props)
{
  let { id, username, avatar} = props.userData;

  return(
    <span>
      <p>{id + ': ' + username}</p> 
      <img width="100" height="auto" alt="avatar" src={"data:image/png;base64," + avatar} /> 
    </span>
  )
}


function Placeholder() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
