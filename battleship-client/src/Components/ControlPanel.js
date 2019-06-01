import React from 'react';
import './ControlPanel.css'

export default function ControlPanel(props) {
    let gameOver = props.gameOver ? (<h1>You won!!!</h1>) : (<h1>Keep playing!</h1>)
    return (
        <div className="controlPanel">
            <button onClick={ props.onNewGameButtonClicked }>New game</button>
            <h1>Targets left: {props.gameStats.targetsLeft}</h1>
            <h1>Shots taken: {props.gameStats.shotsTaken}</h1>
            { gameOver }
        </div>
    )
}