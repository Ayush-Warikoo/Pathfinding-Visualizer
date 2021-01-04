import React, {useEffect} from 'react';
import './Cell.css';
import {useSelector, useDispatch} from 'react-redux';
import {headerSelect} from './action/index';

function Cell({ cell }) {
    let headerState = useSelector(state => state.headerState);
    const dispatch = useDispatch();

    //dispatch(headerSelect("Finish"));
    //console.log(headerState);

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
        
    }

    const onMouseEnter = () =>
    {

    }

    const onMouseUp = () =>
    {
        //console.log("A");
        //console.log(headerState);
        if(headerState === "Start")
        {
            if(cell.state !== "Finish")
            {
                cell.state = "Start";
            }
        }
    }

    return (
        
        <div 
            className={"Cell " + "Cell__" + cell.state + " Cell__" + isVisitedClass()} 
            onMouseDown={onMouseDown} 
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        >
        </div>
    )
}

export default Cell


