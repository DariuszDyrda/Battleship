import React, { useState, useEffect } from 'react';
import Table from './Components/Table';
import ControlPanel from './Components/ControlPanel'
import './App.css';

const API_URL = '/api'

function App() {
  const [userData, setUserData] = useFetch(`${API_URL}/start`);
  const [gameOver, setGameOver] = useState(false);

  function handleUserDataUpdate(newUserData) {
    setUserData(newUserData);
  }

  async function handleNewGameButtonClicked() {
    const response = await fetch(`${API_URL}/start`);
    const json = await response.json();
    setUserData(json);
    setGameOver(false);
  }
  
  return (
    <div className="App">
      <Table gameMap={ userData.gameMap } onUserDataUpdate= { handleUserDataUpdate } />
      <ControlPanel gameStats={ userData.stats } onNewGameButtonClicked = { handleNewGameButtonClicked } gameOver = { gameOver }/>
    </div>
  );
}

function useFetch(url) {
  const [userData, setUserData] = useState({});
  async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      setUserData(json);
  }
  useEffect(() => {
      fetchUrl();
  }, [url]);
    return [userData, setUserData];
}

export default App;
