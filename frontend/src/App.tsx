import React from 'react';
import './App.css';
import { Rotue } from 'react-router-dom';
import Home from './components/pages/Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
