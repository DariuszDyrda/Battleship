import React from 'react';
import './ControlPanel.css'

export default function ControlPanel(props) {
    return (
        <div className="controlPanel">
            <button>New game</button>
            <h1>Targets left: {props.gameStats.targetsLeft}</h1>
            <h1>Shots taken: {props.gameStats.shotsTaken}</h1>
        </div>
    )
}