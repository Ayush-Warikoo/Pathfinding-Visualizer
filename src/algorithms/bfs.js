//import {useSelector, useDispatch} from 'react-redux';
//import React, {useState, useEffect} from 'react';
import store from '../index';

export const bfsAlgo = (grid) => 
{
    const startCellCoord = store.getState().startCell; 
    const finishCellCoord = store.getState().finishCell; 
    grid = grid.grid;

    let cellQueue = new Array();
    let pathQueue = new Array();
    let orderedVisitedNodes = new Array();
    let visitedArray = setVisitedArray();

    visitedArray[startCellCoord[0]][startCellCoord[1]] = true;
    //grid[startCellCoord[0]][startCellCoord[1]].visited = true;  
    cellQueue.push(grid[startCellCoord[0]][startCellCoord[1]]);
    pathQueue.push( [startCellCoord]);   
    console.log(visitedArray);

    while(cellQueue.length > 0)
    {        
        let cell = cellQueue.shift();
        orderedVisitedNodes.push(cell);
        let path = pathQueue[0];
        let newCell;
        let newPath;
        pathQueue = pathQueue.slice(1);

        //Up 
        if(cell.row > 0 && !visitedArray[cell.row - 1][cell.col] && grid[cell.row - 1][cell.col].state !== "Wall")
        {
            
            newCell = grid[cell.row - 1][cell.col];
            newPath = path.slice();
            //newCell.visited = true;
            visitedArray[cell.row - 1][cell.col] = true;
            cellQueue.push(newCell);
            newPath.push([cell.row - 1, cell.col]);
            pathQueue.push(newPath);

            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                newPath = newPath.map(coord => grid[coord[0]][coord[1]]);
                console.log(newPath); 
                console.log(orderedVisitedNodes);
                return [orderedVisitedNodes, newPath];
            }
        }

        //Right 
        if(cell.col < 49 && !visitedArray[cell.row][cell.col + 1] && grid[cell.row][cell.col + 1].state !== "Wall")
        {
            newCell = grid[cell.row][cell.col + 1];
            newPath = path.slice();
            //newCell.visited = true;
            visitedArray[cell.row][cell.col + 1] = true;
            cellQueue.push(newCell);
            newPath.push([cell.row, cell.col + 1]);
            pathQueue.push(newPath);
            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                newPath = newPath.map(coord => grid[coord[0]][coord[1]]);
                console.log(newPath); 
                console.log(orderedVisitedNodes);
                return [orderedVisitedNodes, newPath];
            }
        }


        //Down
        if(cell.row < 19 && !visitedArray[cell.row + 1][cell.col] && grid[cell.row + 1][cell.col].state !== "Wall")
        {
            newCell = grid[cell.row + 1][cell.col];
            newPath = path.slice();
            //newCell.visited = true;
            visitedArray[cell.row + 1][cell.col] = true;
            cellQueue.push(newCell);
            newPath.push([cell.row + 1, cell.col]);
            pathQueue.push(newPath);
            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                newPath = newPath.map(coord => grid[coord[0]][coord[1]]);
                console.log(newPath); 
                console.log(orderedVisitedNodes);
                return [orderedVisitedNodes, newPath];
            }
        }
        //Left
        if(cell.col > 0 && !visitedArray[cell.row][cell.col - 1] && grid[cell.row][cell.col - 1].state !== "Wall")
        {
            newCell = grid[cell.row][cell.col - 1];
            newPath = path.slice();
            //newCell.visited = true;
            visitedArray[cell.row][cell.col - 1] = true;
            cellQueue.push(newCell);
            newPath.push([cell.row, cell.col - 1]);
            pathQueue.push(newPath);
            if(newCell.row === finishCellCoord[0] && newCell.col === finishCellCoord[1])
            {
                console.log(newCell.row, newCell.col);
                newPath = newPath.map(coord => grid[coord[0]][coord[1]]);
                console.log(newPath); 
                console.log(orderedVisitedNodes);
                return [orderedVisitedNodes, newPath];
            }
        }
        //await sleep(10); 
        
        
    }
    console.log("NOT POSSIBLE")
    console.log(cellQueue);
    return [orderedVisitedNodes, false];

}

function sleep(ms)
{
    return new Promise(res => setTimeout(res, ms));
}

function setVisitedArray()
{
    let arr = [];
    for(let i = 0; i < 20; i++)
    {
        arr.push(new Array(50).fill(false));
    }
    return arr;
}

