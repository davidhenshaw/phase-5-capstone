import logo from './logo.svg';
import './App.css';
import { React, useState} from 'react';

function App() {

  const [base64Img, setBase64Img] = useState(0);

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

    console.log("binary string:", base64Img)
  }

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
      {
        base64Img ?
        <img src={"data:image/png;base64," + base64Img}/>
        :
        null
      }
    </div>
  );
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
