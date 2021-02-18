import React, {useState} from 'react';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import {headerSelect} from './action/index';
import algorithmManager from './algorithms/algorithms';
import { CELL_WALL_STATE, FINISH_STATE, START_STATE, WEIGHT_ONE_STATE } from './constants';

function Header({ grid, clear }) {
    const [algorithm, setAlgorithm] = useState(null);

    const dispatch = useDispatch();
    return (
        <div className="Header">
            <div className="Header__Top">
                <div className="Header__ClearBoard"> 
                    <button onClick={clear} > Clear Board </button>
                </div>
                <div className="Header__GenerateBoard"> 
                    <button onClick={clear} > Clear Board </button>
                </div>
                <div className="Header__Title">
                    <h1 style={{color: "rgb(35,109,187)"}}> Pathfinding Visualizer </h1> 
                </div> 
                <div className="Header__Algorithms">
                    <select type="diet" onChange={e => setAlgorithm(e.target.value)}> 
                        <option class="default" selected disabled hidden> Pick an Algorithm! </option>
                        <option class="Bfs"> Bfs </option>, 
                        <option class="Dijkstra"> Dijkstra </option>
                    </select>
                </div> 
                <div className="Header__RunProgram">
                    <button disabled={!algorithm} onClick={() => algorithmManager(grid, algorithm)} > 
                        {!algorithm 
                        ? `Pick an Algorithm!`
                        : `Run ${algorithm}`} 
                    </button>
                </div>
            </div>

            <div className="Header__Bottom">
                <div className="Header__PathCells"> 
                    <div className="PathCells__Title"> 
                        <h2 style={{color: "white"}}> Path Cells </h2>
                    </div> 
                    <div className="Start__Cell" onClick={() => dispatch(headerSelect(START_STATE))}> 
                        <h3> Start Cell </h3>
                    </div>
                    <div className="Finish__Cell" onClick={() => dispatch(headerSelect(FINISH_STATE))}> 
                        <h3> Finish Cell </h3>
                    </div>
                </div>
                <div className="Header__Walls"> 
                    <div className="Walls__Title"> 
                        <h2 style={{color: "white"}}> Walls </h2>
                    </div>
                    <div className="Block__Wall" onClick={() => dispatch(headerSelect("Wall"))}> 
                        <h3> Block Wall </h3>
                    </div>
                    <div className="Border__Wall">
                        <h3> Border Wall </h3> 
                    </div>
                </div>
                <div className="Header__Weights"> 
                    <div className="Weights__Title"> 
                        <h2 style={{color: "white"}}> Weights </h2>
                    </div>
                    <div className="Weight__One" onClick={() => dispatch(headerSelect("Weight"))}> 
                        <h3> Weight One </h3>
                    </div>
                    <div className="Weight__Two"> 
                        <h3> Weight Two </h3>
                    </div>
                </div>     
            </div>
        </div>
    )
}

export default Header
