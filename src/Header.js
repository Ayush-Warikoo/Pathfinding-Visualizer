import React, {useState} from 'react';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import {headerSelect} from './action/index';
import {bfs} from './algorithms/bfs';
import {dijkstra} from './algorithms/dijkstra';

/*
const clearBoard = (grid, clear) =>
{
    grid = grid.grid;
    console.log(grid);
    clear = true;
}
*/

function Header({ grid, clear }) {
    const dispatch = useDispatch();
    return (
        <div className="Header">
            
            <div className="Header__Start" onClick={() => dispatch(headerSelect("Start"))}> 
                <h2> Start </h2>
            </div>
            <div className="Header__Finish" onClick={() => dispatch(headerSelect("Finish"))}> 
                <h2> Finish </h2>
            </div>
            <div className="Header__Wall" onClick={() => dispatch(headerSelect("Wall"))}> 
                <h2> Wall </h2>
            </div>
            <div className="Header__Weight" onClick={() => dispatch(headerSelect("Weight"))}> 
                <h2> Weight </h2>
            </div>
            <div className="Header__Algorithm" > 
                <h2> Algorithm </h2>
                <button onClick={() => bfs(grid)}> Breadth-first search </button> 
                <button onClick={() => dijkstra(grid)}> Dijkstra </button> 

            </div>
            <div className="Header__RunProgram"> 
                <h2> Run Program </h2>
            </div>
            <div className="Header__ClearBoard"> 
                <h2> Clear Board </h2>
                <button onClick={clear} > Clear Board </button>
            </div>            
        </div>
    )
}

export default Header
