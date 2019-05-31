import React from 'react';
import './ControlPanel.css'

export default function ControlPanel(props) {
    return (
        <div className="controlPanel">
            <button>New game</button>
            <h1>Targets left: {props.gameStats.targetsLeft}</h1>
        </div>
    )
}