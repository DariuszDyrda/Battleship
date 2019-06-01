import React, { useState, useEffect } from 'react';
import Table from './Components/Table';
import ControlPanel from './Components/ControlPanel'
import './App.css';

const API_URL = 'http://localhost:8080'

function App() {
  const [gameStats, setGameStats] = useFetch(`${API_URL}/stats`);
  const [map, setMap] = useFetch(`${API_URL}/start`);
  const [gameOver, setGameOver] = useState(false);

  function handleGameStatusUpdate(newGameStatus) {
    setGameStats(newGameStatus.stats);
    setGameOver(newGameStatus.gameOver);
  }

  function handleMapUpdate(newMap) {
    setMap(newMap);
  }

  async function handleNewGameButtonClicked() {
    const response = await fetch(`${API_URL}/start`);
    const stats = await fetch(`${API_URL}/stats`);
    const json = await response.json();
    const statsJson = await stats.json();
    setMap(json);
    setGameStats(statsJson);
    setGameOver(false);
  }
  
  return (
    <div className="App">
      <Table gameMap={ map } onGameStatusUpdate={ handleGameStatusUpdate } onMapUpdate= { handleMapUpdate } />
      <ControlPanel gameStats={ gameStats } onNewGameButtonClicked = { handleNewGameButtonClicked } gameOver = { gameOver }/>
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
