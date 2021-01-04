import React, {useState, useEffect} from 'react';
import './Cell.css';
import {useSelector, useDispatch} from 'react-redux';
import {headerSelect} from './action/index';

function Cell({ cell }) {
    let headerState = useSelector(state => state.headerState);
    console.log(headerState);
    //const dispatch = useDispatch();
    //dispatch(headerSelect("Finish"));
    //console.log(headerState);

    const [cellState, setCellState] = useState(cell.state);
    const [cellVisited, setCellVisited] = useState(cell.visited);


    

    useEffect(() => {

    }, [cell])

    const isVisitedClass = () =>
    {
        if(cell.visited)
        {
            return "Visited";
        }
        return "NotVisited";
    }

    const onMouseDown = () =>
    {
        if(headerState === "Wall" && cellState !== "Start" && cellState !== "Finish")
        {
            setCellState("Wall");
        }
        else if(headerState === "Weight" && cellState !== "Start" && cellState !== "Finish")
        {
            setCellState("Weight");
        }
        cell.state = cellState;        
    }

    const onMouseEnter = () =>
    {

    }

    const onMouseUp = () =>
    {
        if(headerState === "Start" && cellState !== "Finish")
        {
            setCellState("Start");
        }
        else if(headerState === "Finish" && cellState !== "Start")
        {
            setCellState("Finish");
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


