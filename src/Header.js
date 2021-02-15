import React, {useState} from 'react';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import {headerSelect} from './action/index';
import algorithmManager from './algorithms/algorithms';

function Header({ grid, clear }) {
    const [algorithm, setAlgorithm] = useState(null);

    const dispatch = useDispatch();
    return (
        <div className="Header">
            <div className="Header__Title">
                <h1 style={{color: "rgb(35,109,187)"}}> Pathfinding Visualizer </h1> 
            </div> 
            <div className="Header__Subtitle">
                <div className="Header__PathCells"> 
                    <div className="PathCells__Title"> 
                        <h2 style={{color: "white"}}> Path Cells </h2>
                    </div> 
                    <div className="Start__Cell" onClick={() => dispatch(headerSelect("Start"))}> 
                        <h3> Start Cell </h3>
                    </div>
                    <div className="Finish__Cell" onClick={() => dispatch(headerSelect("Finish"))}> 
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
                <div className="Header__Algorithms" > 
                    <div className="Algorithms__Title"> 
                        <h2 style={{color: "white"}}> Algorithms </h2>
                    </div>
                    <div className="Algorithm__Dropdown">
                        <select type="diet" onChange={e => setAlgorithm(e.target.value)}> 
                            <option class="default" selected disabled hidden> Pick an Algorithm! </option>
                            <option class="Bfs"> Bfs </option>, 
                            <option class="Dijkstra"> Dijkstra </option>
                        </select>
                  </div> 

                </div>
                <div className="Header__RunProgram"> 
                    <div className="Controls__Title"> 
                        <h2 style={{color: "white"}}> Controls </h2>
                    </div>
                    <div> 
                        <button onClick={clear} > Clear Board </button>
                    </div>
                    <div>
                        <button disabled={!algorithm} onClick={() => algorithmManager(grid, algorithm)} > 
                            {!algorithm 
                            ? `Pick an Algorithm!`
                            : `Run ${algorithm}`} 
                        </button>
                    </div>
                </div>         
            </div>
        </div>
    )
}

export default Header
