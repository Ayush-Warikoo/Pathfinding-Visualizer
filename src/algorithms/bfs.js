//import {useSelector, useDispatch} from 'react-redux';
//import React, {useState, useEffect} from 'react';
import store from '../index';

export const bfs = (grid) => 
{
    const startCellCoord = store.getState().startCell; 
    const finishCellCoord = store.getState().finishCell; 
    grid = grid.grid;

    let cellQueue = new Array();
    let pathQueue = new Array();

    grid[startCellCoord[0]][startCellCoord[1]].visited = true;  
    cellQueue.push(grid[startCellCoord[0]][startCellCoord[1]]);
    pathQueue.push( [startCellCoord]);   

    while(cellQueue.length > 0)
    {        
        let cell = cellQueue.shift();
        let path = pathQueue[0];
        let newCell;
        let newPath;
        pathQueue = pathQueue.slice(1);

        //Up 
        if(cell.row > 0 && !grid[cell.row - 1][cell.col].visited && grid[cell.row - 1][cell.col].state !== "Wall")
        {
            
            newCell = grid[cell.row - 1][cell.col];
            newPath = path.slice();
            newCell.visited = true;
            cellQueue.push(newCell);
            newPath.push([cell.row - 1, cell.col]);
            pathQueue.push(newPath);

            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                console.log(newPath); 
                newPath.forEach(coord => grid[coord[0]][coord[1]].path = true);
                return newCell;
            }
        }

        //Right 
        if(cell.col < 49 && !grid[cell.row][cell.col + 1].visited && grid[cell.row][cell.col + 1].state !== "Wall")
        {
            newCell = grid[cell.row][cell.col + 1];
            newPath = path.slice();
            newCell.visited = true;
            cellQueue.push(newCell);
            newPath.push([cell.row, cell.col + 1]);
            pathQueue.push(newPath);
            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                console.log(newPath); 
                newPath.forEach(coord => grid[coord[0]][coord[1]].path = true);
                return newCell;
            }
        }

        //Down
        if(cell.row < 19 && !grid[cell.row + 1][cell.col].visited && grid[cell.row + 1][cell.col].state !== "Wall")
        {
            newCell = grid[cell.row + 1][cell.col];
            newPath = path.slice();
            newCell.visited = true;
            cellQueue.push(newCell);
            newPath.push([cell.row + 1, cell.col]);
            pathQueue.push(newPath);
            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                console.log(newPath); 
                newPath.forEach(coord => grid[coord[0]][coord[1]].path = true);
                return newCell;
            }
        }

        //Left
        if(cell.col > 0 && !grid[cell.row][cell.col - 1].visited && grid[cell.row][cell.col - 1].state !== "Wall")
        {
            newCell = grid[cell.row][cell.col - 1];
            newPath = path.slice();
            newCell.visited = true;
            cellQueue.push(newCell);
            newPath.push([cell.row, cell.col - 1]);
            pathQueue.push(newPath);
            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                console.log(newPath); 
                newPath.forEach(coord => grid[coord[0]][coord[1]].path = true);
                return newCell;
            }
        }
        
    }
    console.log("NOT POSSIBLE")
    console.log(cellQueue);

}


