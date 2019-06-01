import React from 'react';
import Cell from './Cell';

const API_URL = 'http://localhost:8080'
const TABLE_SIZE = 10;

export default function Table(props) {
    const map = props.gameMap;
    // const map = [
    //     ['x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'x', 'x'],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', 'x', ' ', ' ', 'x', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' '],
    //     [' ', ' ', 'x', 'x', ' ', ' ', ' ', ' ', 'x', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' '],
    //     ['x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
    // ]

    function handleCellClick(x, y, e) {
        console.log(`Cell clicked X: ${x}, Y: ${y}`);
        fetch(`${API_URL}/shoot`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({x, y}),
        })
        .then(res => res.json())
        .then(data => {
            props.onMapUpdate(data.gameStatus.map);
            props.onGameStatusUpdate(data.gameStatus.stats)
        })
        .catch(e => {
            console.log('Error ' + e);
        })
    }


    let rows = []

    map.forEach((row, y) => {
        rows.push(row.map((element, x) => {
            if(element === "o") {
                return Cell({class: 'ship', key: (10*x+y), onClick: handleCellClick.bind(this, x, y) });
            } else if(element === '-') {
                return Cell({class: 'missed', key: (10*x+y), onClick: handleCellClick.bind(this, x, y) });
            } else {
                return Cell({ class: 'empty', key: (10*x+y), onClick: handleCellClick.bind(this, x, y) });
            }
        }));
    })

    rows = rows.map((row, index) => {
        return (<tr key={index}>
            {row}
        </tr>)
    })

    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}