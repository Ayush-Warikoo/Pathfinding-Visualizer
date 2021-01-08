import React, {useState } from 'react';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import {headerSelect} from './action/index';
import {bfsAlgo} from './algorithms/bfs';
import {dijkstra} from './algorithms/dijkstra';


function Header(grid) {
    const dispatch = useDispatch();
    const [updateCell, setUpdateCell] = useState(false);

    let startCellCoord = useSelector(state => state.startCell);
    let finishCellCoord = useSelector(state => state.finishCell);

    const bfs = (grid) =>
    {
        //console.log(bfsAlgo(grid));
        
        let [orderedVisitedCells, pathCells] = bfsAlgo(grid);
        console.log(pathCells);
        //return;
        /*
        for(const cell of orderedVisitedCells)
        {
            cell.visited = false;
        }
        */
        console.log(orderedVisitedCells);
        console.log(pathCells);
        
        //dispatch(headerSelect("{i}"));
        for (let i = 0; i <= orderedVisitedCells.length; i++) {
            if (i === orderedVisitedCells.length) {
              setTimeout(() => {
                if(pathCells === false)
                {
                    alert("Impossible to path from start to finish!");
                    return; 
                }
                for (let j = 0; j < pathCells.length; j++) {
                    setTimeout(() => {
                      const cell = pathCells[j];
                      cell.path = true;
                      console.log(cell);
                      dispatch(headerSelect(j));
                    }, 100 * j);
                }
              }, 20 * i);
              return;
            }
            setTimeout(() => {
              const cell = orderedVisitedCells[i];
              cell.visited = true;
              console.log(cell);
              dispatch(headerSelect(i));
            }, 20 * i);
        }

        console.log(orderedVisitedCells);
        console.log(pathCells);
        return;
    }

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
            </div>            
        </div>
    )
}

export default Header
