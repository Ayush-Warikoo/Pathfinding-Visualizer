import store from '../index';
import {NUM_ROW, NUM_COL, WEIGHT_ONE_VALUE, WEIGHT_TWO_VALUE, CELL_WALL_STATE, WEIGHT_ONE_STATE, WEIGHT_TWO_STATE} from '../constants';

//Calculates orderedVisitedCells and orderedPathCells, returns false for pathCells if no path exists 
const dijkstraAlgo = (grid) => 
{
    const startCoord = store.getState().startCell; 
    const finishCoord = store.getState().finishCell; 

    let orderedVisitedCells = [];
    let orderedPathCells = [];
    let dijkstraTable = setDijkstraTable(grid, startCoord, finishCoord);

    let numUnvisited = NUM_ROW * NUM_COL;
    let currCell = null;
    let foundFinish = false;

    while(numUnvisited > 0)
    {
        //Getting the currCell
        let minStartDistance = Number.MAX_SAFE_INTEGER;
        for(let r = 0; r < NUM_ROW; r++)
        {
            for(let c = 0; c < NUM_COL; c++)
            {
                let cell = dijkstraTable[r][c];
                if(!cell.wall && !cell.visited && cell.startDistance < minStartDistance)
                {
                    currCell = cell;
                    minStartDistance = cell.startDistance;
                }
            }
        }

        //Occurs when blocked in by walls
        if(minStartDistance >= Number.MAX_SAFE_INTEGER)
        {
            break;
        }
        //Occurs when finish cell is found
        else if(currCell.row === finishCoord[0] && currCell.col === finishCoord[1])
        {
            foundFinish = true;
            currCell.visited = true;
            orderedVisitedCells.push(grid[currCell.row][currCell.col]);
            numUnvisited--;
            break;
        }
        
        //Check neighbouring cells 
        //Up 
        if(currCell.row > 0)
        {
            directionCheck(currCell.row - 1, currCell.col, dijkstraTable, currCell.startDistance, [currCell.row, currCell.col].slice());
        }
        //Right
        if(currCell.col < NUM_COL - 1)
        {
            directionCheck(currCell.row, currCell.col + 1, dijkstraTable, currCell.startDistance, [currCell.row, currCell.col].slice());
        }
        //Down
        if(currCell.row < NUM_ROW - 1)
        {
            directionCheck(currCell.row + 1, currCell.col, dijkstraTable, currCell.startDistance, [currCell.row, currCell.col].slice());
        }
        //Left
        if(currCell.col > 0)
        {
            directionCheck(currCell.row, currCell.col - 1, dijkstraTable, currCell.startDistance, [currCell.row, currCell.col].slice());
        }

        currCell.visited = true;
        orderedVisitedCells.push(grid[currCell.row][currCell.col]);
        numUnvisited--;
    }

    if(!foundFinish)
    {
        return [orderedVisitedCells, false];
    }

    let coords = finishCoord.slice();
    //Finds orderedPathCells 
    while(coords[0] !== startCoord[0] || coords[1] !== startCoord[1])
    {
        orderedPathCells.push(grid[coords[0]][coords[1]]);
        coords = dijkstraTable[coords[0]][coords[1]].previousCoord.slice();
    } 
    return [orderedVisitedCells, orderedPathCells.reverse()];
}

//Initialize the dijkstra table for dijkstraAlgo
const setDijkstraTable = (grid, startCoord, finishCoord) => 
{
    let table = [];
    for(let r = 0; r < NUM_ROW; r++)
    {
        let currRow = [];
        for(let c = 0; c < NUM_COL; c++)
        {
            let weightValue = 1;
            let wallValue = false;
            let startDistanceValue = Number.MAX_SAFE_INTEGER;

            if(grid[r][c].state === WEIGHT_ONE_STATE)
            {
                weightValue = WEIGHT_ONE_VALUE;
            }
            if(grid[r][c].state === WEIGHT_TWO_STATE)
            {
                weightValue = WEIGHT_TWO_VALUE;
            }
            else if(grid[r][c].state === CELL_WALL_STATE)
            {
                wallValue = true;
            }
            if(r === startCoord[0] && c === startCoord[1])
            {
                startDistanceValue = 0;
                wallValue = false;
            }
            if(r === finishCoord[0] && c === finishCoord[1])
            {
                wallValue = false;
            }

            let cell = {
                row: r,
                col: c,
                startDistance: startDistanceValue,
                previousCoord: null,
                visited: false, 
                weight: weightValue,
                wall: wallValue
            }
            currRow.push(cell);
        }
        table.push(currRow);
    }
    return table;
}

const directionCheck = (row, col, dijkstraTable, startDistance, coords) =>
{
    let cell = dijkstraTable[row][col];
    
    if(!cell.wall && !cell.visited)
    {
        let newDistance = startDistance + cell.weight;
        if(newDistance < cell.startDistance)
        {
            cell.startDistance = newDistance;
            cell.previousCoord = coords;
        }
    }
}

export default dijkstraAlgo;
