import React, { useState, useEffect } from "react";
import Header from "./Header";
import Cell from "./Cell";
import "./MainPage.css";
import { NUM_COL, NUM_ROW, NO_STATE } from "./constants";

function MainPage() {
    const [grid, setGrid] = useState([]);
    const [clearBoard, setClearBoard] = useState(0);

    //TODO: Figure out how to update the cells using lifting
    const updateCell = (cell) => {
        let newGrid = grid.map((arr) => arr.slice());
        newGrid[cell.row][cell.col] = cell;
        setGrid(newGrid);
    };

    const clear = () => {
        setClearBoard(clearBoard + 1);
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
            <Header grid={grid} clear={clear} updateCell={updateCell}/>
            <div className="Grid">
                {grid.map((row, indexR) => {
                    return (
                        <div key={indexR} className="Grid__Row">
                            {row.map((col, indexC) => (
                                <Cell
                                    key={indexR + ", " + indexC}
                                    cellProp={grid[indexR][indexC]}
                                    updateCell={updateCell}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainPage;
