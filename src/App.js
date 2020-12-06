import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Authorization from './components/Authorization';

function App(props) {
  return (
    <div className="App">
      <Authorization />
    </div>
  );
}

export default App;
