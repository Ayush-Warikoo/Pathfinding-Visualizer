import React, {useState, useEffect} from 'react';
import './Cell.css';
import {useSelector, useDispatch} from 'react-redux';
import { setStart, setFinish } from './action/index';

function Cell({ cell }) {
    //Store Values
    let headerState = useSelector(state => state.headerState);
    let startCellCoord = useSelector(state => state.startCell);
    let finishCellCoord = useSelector(state => state.finishCell);

    //Helper functions
    const isStartCell = () =>
    {
        return (cell.row === startCellCoord[0] && cell.col === startCellCoord[1]);
    }

    const isFinishCell = () =>
    {
        return (cell.row === finishCellCoord[0] && cell.col === finishCellCoord[1]);
    }

    const isVisitedClass = () =>
    {
        if(cell.visited)
        {
            return "Visited";
        }
        return "NotVisited";
    }

    //States
    const [startCell, setStartCell] = useState(isStartCell());
    const [finishCell, setFinishCell] = useState(isFinishCell());
    const [cellState, setCellState] = useState(cell.state);
    const [cellVisited, setCellVisited] = useState(cell.visited);
    const dispatch = useDispatch();

    //Event handling functions 
    useEffect(() => {
        
        if(startCell && !isStartCell())
        {
            setStartCell(false);
        }
        else if(finishCell && !isFinishCell())
        {
            setFinishCell(false);
        }
    }, [startCellCoord, finishCellCoord])

    const onMouseDown = (e) =>
    {
        
        if(headerState === "Wall" && e.buttons === 1)
        {
            if(cellState === "Wall")
            {
                setCellState("None");
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Wall");
            }
        }
        else if(headerState === "Weight" && e.buttons === 1)
        {
            if(cellState === "Weight")
            {
                setCellState("None");
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Weight");
            }
        }
        cell.state = cellState;
    }

    const onMouseEnter = (e) =>
    {
        
        if(headerState === "Wall" && e.buttons === 1)
        {
            if(cellState === "Wall")
            {
                setCellState("None");
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Wall");
            }
        }
        else if(headerState === "Weight" && e.buttons === 1)
        {
            if(cellState === "Weight")
            {
                setCellState("None");
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Weight");
            }
        }
        cell.state = cellState;
    }

    const onMouseUp = (e) =>
    {
        
        if(headerState === "Start" && !finishCell)
        {
            setStartCell(true);
            dispatch(setStart([cell.row, cell.col]));
        }
        else if(headerState === "Finish" && !startCell)
        {
            setFinishCell(true);
            dispatch(setFinish([cell.row, cell.col]));
        }   
    }

    //Regular functions
    const setState = () =>
    {
        if(startCell)
        {
            return "Start";
        }
        else if(finishCell)
        {
            return "Finish";
        }
        return cellState;
    }

    return (        
        <div 
            className={"Cell " + "Cell__" + setState() + " Cell__" + isVisitedClass()} 
            onMouseDown={onMouseDown} 
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        >
        </div>
        
    )
}

export default Cell


