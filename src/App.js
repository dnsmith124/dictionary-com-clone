import './App.css';
import React, {useState} from "react";
import WordSearch from './Components/WordSearch';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <h2>Dictionary Clone</h2>
        </div>
      </header>
      <div className="container">
        <WordSearch/>
      </div>
    </div>
  );
}

export default App;
