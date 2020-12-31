import React, {useState, useEffect } from 'react';
import Header from './Header';
import Cell from './Cell';
import './MainPage.css';

function MainPage() {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        let cells = [];
        for(let r = 0; r < 20; r++)
        {
            let currRow = [];
            for(let c = 0; c < 50; c++)
            {
                currRow.push([]);
            }
            cells.push(currRow);
        }
        setGrid(cells);
    }, [])

    return (
        <div className="MainPage">
            <Header> </Header>
            <div className="Grid">
                { grid.map((row, indr) => {
                    return (<div className="Grid__row"> {row.map((node, indn) => <Cell> </Cell>)} </div>)
                })}
            </div>
            
        </div>
    )
}

export default MainPage
