import React from 'react';
import './App.css';
import Search from './Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Algolia POC Search</h1>
        <Search />
      </header>
    </div>
  );
}

export default App;
