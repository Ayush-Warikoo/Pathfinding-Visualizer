import React, {useState, useEffect } from 'react';
import Header from './Header';
import Cell  from './Cell';
import './MainPage.css';

function MainPage() {   
    const [grid, setGrid] = useState([]);
    

    useEffect(() => {
        let grid = [];
        for(let r = 0; r < 20; r++)
        {
            let currRow = [];
            for(let c = 0; c < 50; c++)
            {
                //State can be None, Wall or Weight
                let cell = {
                    row: r,
                    col: c,
                    visited: false, 
                    state: "None"
                }
                currRow.push(cell);
            }
            grid.push(currRow);
        }
        setGrid(grid);
    }, [])
    
    return (
        <div className="MainPage" >
            <Header/>
            <div className="Grid" >
                {grid.map((row, indexR) => {
                    return (
                        <div className="Grid__Row"> 
                            {row.map((col, indexC) => 
                                <Cell 
                                    cell = {grid[indexR][indexC]} 
                                />
                            )} 
                        </div>
                    )
                })}
            </div>       
        </div>
    )
}

export default MainPage
