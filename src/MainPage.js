import React, { useState, useEffect } from "react";
import Header from "./Header";
import Cell from "./Cell";
import "./MainPage.css";
import { NUM_COL, NUM_ROW, NO_STATE } from "./constants";

function MainPage() {
    const [grid, setGrid] = useState([]);
    const [clearBoard, setClearBoard] = useState({});

    const updateCell = (cell) => {
        setGrid((prevGrid) => {
            let newGrid = prevGrid.map((arr) => arr.slice());
            newGrid[cell.row][cell.col] = {...cell};
            return newGrid;
        })
    };

    //Run before facilitating any user action
    const unanimateGrid = () => {
        for (let r = 0; r < NUM_ROW; r++) {
            for (let c = 0; c < NUM_COL; c++) {
                setGrid((prevGrid) => {
                    prevGrid[r][c].visited = false;
                    prevGrid[r][c].path = false;
                    let newGrid = prevGrid.map((arr) => arr.slice());
                    newGrid[r][c] = {...prevGrid[r][c]};
                    return newGrid;
                })
            }
        }
        return;
    };

    const clear = () => {
        setClearBoard({});
    };

    useEffect(() => {
        let grid = [];
        for (let r = 0; r < NUM_ROW; r++) {
            let currRow = [];
            for (let c = 0; c < NUM_COL; c++) {
                let cell = {
                    row: r,
                    col: c,
                    state: NO_STATE,
                    visited: false,
                    path: false,
                };
                currRow.push(cell);
            }
            grid.push(currRow);
        }
        setGrid(grid);
    }, [clearBoard]);

    return (
        <div className="MainPage">
            <Header grid={grid} clear={clear} updateCell={updateCell} unanimateGrid={unanimateGrid}/>
            <div className="Grid">
                {grid.map((row, indexR) => {
                    return (
                        <div key={indexR} className="Grid__Row">
                            {row.map((col, indexC) => 
                                <Cell
                                    key={indexR + ", " + indexC}
                                    cellProp={grid[indexR][indexC]}
                                    updateCell={updateCell}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainPage;
