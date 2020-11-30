import React from "react";
import axios from "axios";
import './App.css';

function App() {

  axios.get("http://localhost:5000/api/users/")
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err));

  return (
    <div className="App">
      <p>Character list goes here.</p>
    </div>
  );
};

export default App;
