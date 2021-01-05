import React, {useState, useEffect} from 'react';
import './Cell.css';
import {useSelector, useDispatch} from 'react-redux';
import { setStart, setFinish } from './action/index';


function Cell({ cell }) {
    let headerState = useSelector(state => state.headerState);
    let startCell = useSelector(state => state.startCell);
    let finishCell = useSelector(state => state.finishCell);
    const dispatch = useDispatch();

    const [cellState, setCellState] = useState(cell.state);
    const [cellVisited, setCellVisited] = useState(cell.visited);  

    useEffect(() => {
        if(((cellState === "Start" || cell.state === "Start") && !(cell.row === startCell[0] && cell.col === startCell[1]))
        || ((cellState === "Finish" || cell.state === "Finish") && !(cell.row === finishCell[0] && cell.col === finishCell[1])))
        {
            setCellState("None");
            cell.state = "None";
        }
    }, [startCell, finishCell])

    const isVisitedClass = () =>
    {
        if(cell.visited)
        {
            return "Visited";
        }
        return "NotVisited";
    }

    
    const onMouseDown = (e) =>
    {
        if(headerState === "Wall" && e.buttons === 1)
        {
            if(cellState === "Wall")
            {
                setCellState("None");
            }
            else if(cellState !== "Start" && cellState !== "Finish")
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
            else if(cellState !== "Start" && cellState !== "Finish")
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
            else if(cellState !== "Start" && cellState !== "Finish")
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
            else if(cellState !== "Start" && cellState !== "Finish")
            {
                setCellState("Weight");
            }
        }
        cell.state = cellState;
    }

    const onMouseUp = (e) =>
    {
        if(headerState === "Start" && cellState !== "Finish")
        {
            setCellState("Start");
            dispatch(setStart([cell.row, cell.col]));
        }
        else if(headerState === "Finish" && cellState !== "Start")
        {
            setCellState("Finish");
            dispatch(setFinish([cell.row, cell.col]));
        }
        cell.state = cellState;
    }

    return (        
        <div 
            className={"Cell " + "Cell__" + cellState + " Cell__" + isVisitedClass()} 
            onMouseDown={onMouseDown} 
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        >
        </div>
        
    )
}

export default Cell


