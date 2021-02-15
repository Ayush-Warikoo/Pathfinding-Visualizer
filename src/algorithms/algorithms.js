import {headerSelect} from '../action/index';
import {forceUpdate} from '../action/index';
import store from '../index';
import bfsAlgo from './bfs';
import dijkstraAlgo from './dijkstra';

const algorithmManager = async (grid, algo) =>
{
    store.dispatch(headerSelect("None"));
    let orderedVisitedCells;
    let pathCells;
    if(algo === "Bfs")
    {
        [orderedVisitedCells, pathCells] = bfsAlgo(grid);
    }
    else if(algo === "Dijkstra")
    {
        [orderedVisitedCells, pathCells] = dijkstraAlgo(grid);
    }
    else
    {
        return;
    }
    await animateVisitedCells(orderedVisitedCells);
    await animatePathCells(pathCells);
    resetGrid(grid);
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

export default algorithmManager;
