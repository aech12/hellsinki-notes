import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const b = new Promise((re, rj)=> {
    setTimeout(() => {
      re(10)
    }, 5000);
  })
  const a = fetch(b)

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
