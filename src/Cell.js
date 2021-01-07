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

    //States
    const [startCell, setStartCell] = useState(isStartCell());
    const [finishCell, setFinishCell] = useState(isFinishCell());
    const [cellState, setCellState] = useState(cell.state);
    const [cellPath, setCellPath] = useState(cell.path);
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
                cell.state = "None";
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Wall");
                cell.state = "Wall";
            }
        }
        else if(headerState === "Weight" && e.buttons === 1)
        {
            if(cellState === "Weight")
            {
                setCellState("None");
                cell.state = "None";
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Weight");
                cell.state = "Weight";
            }
        }
    }

    const onMouseEnter = (e) =>
    {
        
        if(headerState === "Wall" && e.buttons === 1)
        {
            if(cellState === "Wall")
            {
                setCellState("None");
                cell.state = "None";
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Wall");
                cell.state = "Wall";
            }
        }
        else if(headerState === "Weight" && e.buttons === 1)
        {
            if(cellState === "Weight")
            {
                setCellState("None");
                cell.state = "None";
            }
            else if(!startCell && !finishCell)
            {
                setCellState("Weight");
                cell.state = "Weight";
            }
        }       
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
    const setStateClass = () =>
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

    const setVisitedClass = () =>
    {
        if(cell.visited)
        {
            return "Visited";
        }
        return "NotVisited";
    }

    const setPathClass = () =>
    {
        
        if(cell.path)
        {
            return "Path";
        }
        return "NotPath";
    }

    return (        
        <div 
            className={"Cell " + "Cell__" + setStateClass() + " Cell__" + setVisitedClass() + " Cell__" + setPathClass()} 
            onMouseDown={onMouseDown} 
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        >
        </div>
        
    )
}

export default Cell


