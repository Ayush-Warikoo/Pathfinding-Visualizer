//import {useSelector, useDispatch} from 'react-redux';
//import React, {useState, useEffect} from 'react';
import {headerSelect} from '../action/index';
import {forceUpdate} from '../action/index';
import store from '../index';
import {NUM_ROW, NUM_COL} from '../constants';

export const bfs = async (grid) =>
{
    store.dispatch(headerSelect("None"));
    let [orderedVisitedCells, pathCells] = bfsAlgo(grid);
    await animateVisitedCells(orderedVisitedCells);
    await animatePathCells(pathCells);
    resetGrid(grid);
}

//Calculates orderedVisitedCells and pathCells, returns false for pathCells if no path exists 
const bfsAlgo = (grid) => 
{
    const startCoord = store.getState().startCell; 
    const finishCoord = store.getState().finishCell; 

    let cellQueue = [];
    let pathQueue = [];
    let orderedVisitedCells = [];
    let visitedArray = setVisitedArray();

    visitedArray[startCoord[0]][startCoord[1]] = true;
    cellQueue.push(grid[startCoord[0]][startCoord[1]]);
    pathQueue.push([startCoord]);   

    let cond = false;
    let returnPath = false;

    while(cellQueue.length > 0)
    {        
        let cell = cellQueue.shift();
        orderedVisitedCells.push(cell);
        let path = pathQueue.shift();

        //Up 
        if(cell.row > 0 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row - 1, cell.col, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCoord);
        }
        //Right
        if(cell.col < NUM_COL - 1 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row, cell.col + 1, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCoord);
        }
        //Down
        if(cell.row < NUM_ROW - 1 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row + 1, cell.col, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCoord);
        }
        //Left
        if(cell.col > 0 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row, cell.col - 1, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCoord);
        }
        //Condition of finish node found 
        if(cond)
        {
            return [orderedVisitedCells, returnPath];
        }
    }
    return [orderedVisitedCells, false];
}

//Set up visitedArray for bfsAlgo
const setVisitedArray = () =>
{
    let arr = [];
    for(let i = 0; i < NUM_ROW; i++)
    {
        arr.push(new Array(NUM_COL).fill(false));
    }
    return arr;
}

//First return value determines if the finish node is reached, second is newPath needed 
const directionCheck = (row, col, newPath, visitedArray, grid, cellQueue, pathQueue, finishCellCoord) =>
{
    if(!visitedArray[row][col] && 
        (grid[row][col].state !== "Wall" || (row === finishCellCoord[0] && col === finishCellCoord[1])))
    {
        let newCell = grid[row][col];
        visitedArray[row][col] = true;
        cellQueue.push(newCell);
        newPath.push([row, col]);
        pathQueue.push(newPath);

        if(row === finishCellCoord[0] && col === finishCellCoord[1])
        {
            newPath = newPath.map(coord => grid[coord[0]][coord[1]]);
            return [true, newPath];
        }
    }
    return [false, newPath];
}

const animateVisitedCells = (orderedVisitedCells) =>
{
    return new Promise((resolve, reject) => {
        for (let i = 0; i < orderedVisitedCells.length; i++) {
            setTimeout(() => {
                const cell = orderedVisitedCells[i];
                cell.visited = true;
                store.dispatch(forceUpdate(i));
                if(i === orderedVisitedCells.length - 1)
                {
                    resolve();
                }
            }, 20 * i);
        }
    })
}

const animatePathCells = (pathCells) =>
{
    if(pathCells === false)
    {
        alert("Impossible to path from start to finish!");
        return;
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < pathCells.length; i++) {
            setTimeout(() => {
                const cell = pathCells[i];
                cell.path = true;
                store.dispatch(forceUpdate(i));
                if(i === pathCells.length - 1)
                {
                    resolve();
                }
            }, 100 * i);
        }    
    })
}

const resetGrid = (grid) =>
{
    for(let r = 0; r < grid.length; r++)
    {
        for(let c = 0; c < grid[r].length; c++)
        {
            grid[r][c].visited = false;
            grid[r][c].path = false;
        }
    }
    return;
}

