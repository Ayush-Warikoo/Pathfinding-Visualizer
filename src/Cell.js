import React, {useState, useEffect} from 'react';
import './Cell.css';
import {useSelector, useDispatch} from 'react-redux';
import { setStart, setFinish } from './action/index';


function Cell({ cell }) {
    let headerState = useSelector(state => state.headerState);
    let startCellCoord = useSelector(state => state.startCell);
    let finishCellCoord = useSelector(state => state.finishCell);
    const dispatch = useDispatch();

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

    const [astartCell, setStartCell] = useState(isStartCell());
    const [afinishCell, setFinishCell] = useState(isFinishCell());
    const [cellState, setCellState] = useState(cell.state);
    const [cellVisited, setCellVisited] = useState(cell.visited);

    useEffect(() => {
        if(cellState === "Start" && !isStartCell() || cellState === "Finish" && !isFinishCell())
        {
            setCellState("None");
            cell.state = "None";
        }
    }, [startCellCoord, finishCellCoord])

    const setState = () =>
    {
        if(isStartCell())
        {
            return "Start";
        }
        else if(isFinishCell())
        {
            return "Finish";
        }
        return cellState;
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
            className={"Cell " + "Cell__" + setState() + " Cell__" + isVisitedClass()} 
            onMouseDown={onMouseDown} 
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        >
        </div>
        
    )
}

export default Cell


