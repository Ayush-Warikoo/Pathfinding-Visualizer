import React, {useState} from 'react';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import {headerSelect} from './action/index';
import algorithmManager from './algorithms/algorithms';
import { CELL_WALL_STATE, FINISH_STATE, START_STATE, WEIGHT_ONE_STATE, WEIGHT_TWO_STATE, BORDER_WALL_STATE, WALLS_TITLE, WEIGHTS_TITLE, PATH_CELLS_TITLE} from './constants';

function Header({ grid, clear }) {
    const [algorithm, setAlgorithm] = useState(null);

    const dispatch = useDispatch();
    let headerState = useSelector(state => state.headerState);

    const setSelectedTitleClass = (title) => {
        if(((headerState === START_STATE || headerState === FINISH_STATE) && title === PATH_CELLS_TITLE)
        || ((headerState === CELL_WALL_STATE || headerState === BORDER_WALL_STATE) && title === WALLS_TITLE)
        || ((headerState === WEIGHT_ONE_STATE || headerState === WEIGHT_TWO_STATE) && title === WEIGHTS_TITLE))
        {
            return " Header__SelectedTitle";
        }
        return " Header__NotSelectedTitle";
    }
 
    const setSelectedStateClass = (cell) => {
        if(cell === headerState)
        {
            return " Header__SelectedState";
        }
        return " Header__NotSelectedState"
    }

    return (
        <div className="Header">
            <div className="Header__Top">
                <div className="Header__ClearBoard"> 
                    <button onClick={clear} > Clear Board </button>
                </div>
                <div className="Header__GenerateBoard"> 
                    <button /*onClick={clear}*/ >Generate Random Board </button>
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
                <div className={"Header__PathCells" + setSelectedTitleClass(PATH_CELLS_TITLE)}> 
                    <div className="Header__PathCellsTitle"> 
                        <h2> Path Cells </h2>
                    </div> 
                    <div 
                        className={"Header__StartCell" + setSelectedStateClass(START_STATE)} 
                        onClick={() => dispatch(headerSelect(START_STATE))}> 
                        <h3> Start Cell </h3>
                    </div>
                    <div 
                        className={"Header__FinishCell" + setSelectedStateClass(FINISH_STATE)} 
                        onClick={() => dispatch(headerSelect(FINISH_STATE))}> 
                        <h3> Finish Cell </h3>
                    </div>
                </div>
                <div className={"Header__Walls" + setSelectedTitleClass(WALLS_TITLE)}> 
                    <div className="Header__WallsTitle"> 
                        <h2> Walls </h2>
                    </div>
                    <div className={"Header__CellWall" + setSelectedStateClass(CELL_WALL_STATE)} onClick={() => dispatch(headerSelect(CELL_WALL_STATE))}> 
                        <h3> Block Wall </h3>
                    </div>
                    <div className={"Header__BorderWall" + setSelectedStateClass(BORDER_WALL_STATE)} onClick={() => dispatch(headerSelect(BORDER_WALL_STATE))}>
                        <h3> Border Wall </h3> 
                    </div>
                </div>
                <div className={"Header__Weights" + setSelectedTitleClass(WEIGHTS_TITLE)}> 
                    <div className="Header__WeightsTitle"> 
                        <h2> Weights </h2>
                    </div>
                    <div 
                        className={"Header__WeightOne" + setSelectedStateClass(WEIGHT_ONE_STATE)} onClick={() => dispatch(headerSelect(WEIGHT_ONE_STATE))}> 
                        <h3> Weight One </h3>
                    </div>
                    <div className={"Header__WeightTwo" + setSelectedStateClass(WEIGHT_TWO_STATE)} onClick={() => dispatch(headerSelect(WEIGHT_TWO_STATE))}> 
                        <h3> Weight Two </h3>
                    </div>
                </div>     
            </div>
        </div>
    )
}

export default Header
