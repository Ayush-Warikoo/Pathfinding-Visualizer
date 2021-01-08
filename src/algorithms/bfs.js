//import {useSelector, useDispatch} from 'react-redux';
//import React, {useState, useEffect} from 'react';
import {headerSelect} from '../action/index';
import store from '../index';
import {NUM_ROW, NUM_COL} from '../constants';

export const bfs = async (grid) =>
{
    grid = resetGrid(grid);
    store.dispatch(headerSelect(0));
    let [orderedVisitedCells, pathCells] = bfsAlgo(grid);
    await animateBfs(orderedVisitedCells, pathCells);
    resetGrid(grid);
    store.dispatch(headerSelect(0));
    return;
}

const resetGrid = (grid) =>
{
    for(let r = 0; r < grid.length; r++)
    {
        for(let c = 0; c < grid[r].length; c++)
        {
            grid[r][c].visited = false;
            grid[r][c].path = false;
            if(r === 0 && c === 0)
            {
                console.log(grid[r][c]);
            }
        }
    }
    console.log(grid);
    return grid;
}

const bfsAlgo = (grid) => 
{
    const startCellCoord = store.getState().startCell; 
    const finishCellCoord = store.getState().finishCell; 
    grid = grid.grid;

    let cellQueue = [];
    let pathQueue = [];
    let orderedVisitedNodes = [];
    let visitedArray = setVisitedArray();

    visitedArray[startCellCoord[0]][startCellCoord[1]] = true;
    cellQueue.push(grid[startCellCoord[0]][startCellCoord[1]]);
    pathQueue.push([startCellCoord]);   

    let cond = false;
    let returnPath = false;

    while(cellQueue.length > 0)
    {        
        let cell = cellQueue.shift();
        orderedVisitedNodes.push(cell);
        let path = pathQueue.shift();

        //Up 
        if(cell.row > 0 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row - 1, cell.col, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCellCoord);
        }
        //Right
        if(cell.col < NUM_COL - 1 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row, cell.col + 1, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCellCoord);
        }
        //Down
        if(cell.row < NUM_ROW - 1 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row + 1, cell.col, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCellCoord);
        }
        //Left
        if(cell.col > 0 && !cond)
        {
            [cond, returnPath] = directionCheck(cell.row, cell.col - 1, path.slice(), visitedArray, grid, cellQueue, pathQueue, finishCellCoord);
        }
        //
        if(cond)
        {
            return [orderedVisitedNodes, returnPath];
        }
    }
    return [orderedVisitedNodes, false];
}

//First return value determines if the finish node is reached, second is newPath needed 
const directionCheck = (row, col, newPath, visitedArray, grid, cellQueue, pathQueue, finishCellCoord) =>
{
    if(!visitedArray[row][col] && grid[row][col].state !== "Wall")
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

const animateBfs = async (orderedVisitedCells, pathCells) =>
{
    for (let i = 0; i <= orderedVisitedCells.length; i++) {
        if (i === orderedVisitedCells.length) {
            setTimeout(() => {
            if(pathCells === false)
            {
                alert("Impossible to path from start to finish!");
                return; 
            }
            for (let j = 0; j < pathCells.length; j++) {
                setTimeout(() => {
                    const cell = pathCells[j];
                    cell.path = true;
                    store.dispatch(headerSelect(j));
                }, 100 * j);
            }
            }, 5 * i);
            return;
        }
        setTimeout(() => {
            const cell = orderedVisitedCells[i];
            cell.visited = true;
            store.dispatch(headerSelect(i));
        }, 5 * i);
    }
    return;
}

const setVisitedArray = () =>
{
    let arr = [];
    for(let i = 0; i < NUM_ROW; i++)
    {
        arr.push(new Array(NUM_COL).fill(false));
    }
    return arr;
}

