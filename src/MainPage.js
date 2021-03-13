import React, {useState, useEffect } from 'react';
import Header from './Header';
import Cell  from './Cell';
import './MainPage.css';
import {NUM_COL, NUM_ROW, NO_STATE} from './constants';

function MainPage() {   
    const [grid, setGrid] = useState([]);
    const [clearBoard, setClearBoard] = useState(0);

    const updateCell = (cell) => {

        let newGrid = grid.map(arr => arr.slice());
        newGrid[cell.row][cell.col] = cell;
        setGrid(newGrid);
    }

    useEffect(() => {
        let grid = [];
        for(let r = 0; r < NUM_ROW; r++)
        {
            let currRow = [];
            for(let c = 0; c < NUM_COL; c++)
            {
                //State can be None, Wall or Weight
                let cell = {
                    row: r,
                    col: c,
                    state: NO_STATE,
                    visited: false, 
                    path: false
                }
                currRow.push(cell);
            }
            grid.push(currRow);
        }
        setGrid(grid);
    }, [clearBoard])

    const clear = () =>
    {
        setClearBoard(clearBoard + 1)
    }
    
    return (
        <div className="MainPage" >
            <Header grid={grid} clear={clear} />
            <div className="Grid" >
                {grid.map((row, indexR) => {
                    return (
                        <div className="Grid__Row"> 
                            {row.map((col, indexC) => <Cell cellProp = {grid[indexR][indexC]} updateCell={updateCell} />)} 
                        </div>
                    )
                })}
            </div>       
        </div>
    )
}

export default MainPage
