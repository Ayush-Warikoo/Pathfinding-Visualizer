import React, {useState, useEffect } from 'react';
import Header from './Header';
import Cell  from './Cell';
import './MainPage.css';

function MainPage() {

    const STARTING_CELL = [0, 0];
    const FINISHING_CELL = [19, 49];

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        let grid = [];
        for(let r = 0; r < 20; r++)
        {
            let currRow = [];
            for(let c = 0; c < 50; c++)
            {
                //State can be None, Start, Finish or Wall
                let cell = {
                    row: r,
                    col: c,
                    visited: false, 
                    state: "None"
                }
                if(r == STARTING_CELL[0] && c == STARTING_CELL[1])
                {
                    cell["state"] = "Start";
                }
                else if(r == FINISHING_CELL[0] && c == FINISHING_CELL[1])
                {
                    cell["state"] = "Finish";
                }
                currRow.push(cell);
            }
            grid.push(currRow);
        }
        setGrid(grid);
    }, [])

    

    return (
        <div className="MainPage">
            <Header/>
            <div className="Grid">
                {grid.map((row, indexR) => {
                    return (
                        <div className="Grid__row"> 
                            {row.map((col, indexC) => <Cell cell = {grid[indexR][indexC]}  />)} 
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default MainPage
