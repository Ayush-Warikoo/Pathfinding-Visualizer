import React, {useState, useEffect} from 'react';
import './Cell.css';
import {useSelector, useDispatch} from 'react-redux';
import { setStart, setFinish } from './action/index';
import {CELL_WALL_STATE, WEIGHT_ONE_STATE, WEIGHT_TWO_STATE, NO_STATE} from './constants';

function Cell({ cell }) {
    //Store Values
    let headerState = useSelector(state => state.headerState);
    let startCellCoord = useSelector(state => state.startCell);
    let finishCellCoord = useSelector(state => state.finishCell);
    let forceUpdate = useSelector(state => state.forceUpdate);

    //Helper functions
    const isStartCell = () =>
    {
        return (cell.row === startCellCoord[0] && cell.col === startCellCoord[1]);
    }

    const isFinishCell = () =>
    {
        return (cell.row === finishCellCoord[0] && cell.col === finishCellCoord[1]);
    }

    const handleUpdatingCellState = (state) => {
        if(cell.state === state)
        {
            cell.state = NO_STATE;
            setUpdateCellState(updateCellState + 1);
        }
        else if(!startCell && !finishCell)
        {
            cell.state = state;
            setUpdateCellState(updateCellState + 1);
        }
    }

    //States
    const [startCell, setStartCell] = useState(isStartCell());
    const [finishCell, setFinishCell] = useState(isFinishCell());
    const [updateCellState, setUpdateCellState] = useState(0);
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
        if(e.buttons === 1 && (headerState === CELL_WALL_STATE || headerState === WEIGHT_ONE_STATE || headerState === WEIGHT_TWO_STATE))
        {
            handleUpdatingCellState(headerState);
        }
    }

    const onMouseEnter = (e) =>
    {   
        if(e.buttons === 1 && (headerState === CELL_WALL_STATE || headerState === WEIGHT_ONE_STATE || headerState === WEIGHT_TWO_STATE))
        {
            handleUpdatingCellState(headerState);
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
        return cell.state;
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


