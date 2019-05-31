import React, { useState, useEffect } from 'react';
import Table from './Components/Table';
import ControlPanel from './Components/ControlPanel'
import './App.css';

const API_URL = 'http://localhost:8080'

function App() {
  const [gameStats, setGameStats] = useFetch(`${API_URL}/stats`);

  function handleGameStatusUpdate(newGameStats) {
    setGameStats(newGameStats);
  }

  console.log(gameStats)
  
  return (
    <div className="App">
      <Table onGameStatusUpdate={ handleGameStatusUpdate } />
      <ControlPanel gameStats={ gameStats }/>
    </div>
  );
}

function useFetch(url) {
  const [gameStats, setGameStats] = useState([]);

  async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      setGameStats(json);
    }
    useEffect(() => {
      fetchUrl();
    }, [url]);
    return [gameStats, setGameStats];
}

export default App;
