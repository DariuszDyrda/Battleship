import React from 'react';
import './Cell.css'
export default function Cell(props) {
    return (
        <td className={props.class} onClick={props.onClick}></td>
    )
}