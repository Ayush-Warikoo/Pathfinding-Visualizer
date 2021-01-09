import React, {useState, useEffect } from 'react';
import Header from './Header';
import Cell  from './Cell';
import './MainPage.css';
import {NUM_COL, NUM_ROW} from './constants';

function MainPage() {   
    const [grid, setGrid] = useState([]);

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
                    state: "None",
                    visited: false, 
                    path: false
                }
                currRow.push(cell);
            }
            grid.push(currRow);
        }
        setGrid(grid);
    }, [])
    
    return (
        <div className="MainPage" >
            <Header grid = {grid} />
            <div className="Grid" >
                {
                    grid.map((row, indexR) => {
                    return (
                        <div className="Grid__Row"> 
                            {row.map((col, indexC) => <Cell cell = {grid[indexR][indexC]} />)} 
                        </div>
                    )
                })}
            </div>       
        </div>
    )
}

export default MainPage
