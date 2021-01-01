import React, {useEffect} from 'react';
import './Cell.css';

function Cell({ cell }) {

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

    const onClickFunc = () =>
    {
        //console.log("A");
        //console.log(cell.row, cell.col);
    }

    const onMouseDownFunc = () =>
    {
        //console.log("B");
    }

    return (
        <div className={"Cell " + "Cell__" + cell.state + " Cell__" + isVisitedClass()} onClick={onClickFunc()} onMouseDown={onMouseDownFunc()}>
        </div>
    )
}

export default Cell


