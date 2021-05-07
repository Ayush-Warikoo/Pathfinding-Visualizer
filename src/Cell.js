import React, { useState, useEffect } from "react";
import "./Cell.css";
import { useSelector, useDispatch } from "react-redux";
import { setStart, setFinish } from "./action/index";
import { CELL_WALL_STATE, WEIGHT_ONE_STATE, WEIGHT_TWO_STATE, NO_STATE } from "./constants";

const Cell = React.memo(
    ({ cellProp, updateCell }) => {
        //Store Values
        let headerState = useSelector((state) => state.headerState);
        let startCellCoord = useSelector((state) => state.startCell);
        let finishCellCoord = useSelector((state) => state.finishCell);

        //Helper functions
        const isStartCell = () => {
            return cellProp.row === startCellCoord[0] && cellProp.col === startCellCoord[1];
        };

        const isFinishCell = () => {
            return cellProp.row === finishCellCoord[0] && cellProp.col === finishCellCoord[1];
        };

        //States
        const [startCell, setStartCell] = useState(isStartCell());
        const [finishCell, setFinishCell] = useState(isFinishCell());
        const dispatch = useDispatch();

        //Event handling functions
        const handleUpdatingCellState = (state) => {
            if (cellProp.state === state) {
                cellProp.state = NO_STATE;
                updateCell(cellProp);
            } else if (!startCell && !finishCell) {
                cellProp.state = state;
                updateCell(cellProp);
            }
        };

        useEffect(() => {
            if (startCell && !isStartCell()) {
                setStartCell(false);
            } else if (finishCell && !isFinishCell()) {
                setFinishCell(false);
            }
        }, [startCellCoord, finishCellCoord]);

        const onMouseDown = (e) => {
            if (
                e.buttons === 1 &&
                (headerState === CELL_WALL_STATE ||
                    headerState === WEIGHT_ONE_STATE ||
                    headerState === WEIGHT_TWO_STATE)
            ) {
                handleUpdatingCellState(headerState);
            }
        };

        const onMouseEnter = (e) => {
            if (
                e.buttons === 1 &&
                (headerState === CELL_WALL_STATE ||
                    headerState === WEIGHT_ONE_STATE ||
                    headerState === WEIGHT_TWO_STATE)
            ) {
                handleUpdatingCellState(headerState);
            }
        };

        const onMouseUp = (e) => {
            if (headerState === "Start" && !finishCell) {
                setStartCell(true);
                dispatch(setStart([cellProp.row, cellProp.col]));
            } else if (headerState === "Finish" && !startCell) {
                setFinishCell(true);
                dispatch(setFinish([cellProp.row, cellProp.col]));
            }
        };

        //Regular functions
        const setStateClass = () => {
            if (startCell) {
                return " Cell__Start";
            } else if (finishCell) {
                return " Cell__Finish";
            }
            return " Cell__" + cellProp.state;
        };

        const setVisitedClass = () => {
            if (cellProp.visited) {
                return " Cell__Visited";
            }
            return " Cell__NotVisited";
        };

        const setPathClass = () => {
            if (cellProp.path) {
                return " Cell__Path";
            }
            return " Cell__NotPath";
        };

        const setBorderWallClass = () => {
            let str = "";
            for (let i = 0; i < cellProp.length; i++) {
                str += " Cell__" + cellProp[i] + "Wall";
            }
            return str;
        };

        return (
            <div
                className={
                    "Cell " +
                    setStateClass() +
                    setVisitedClass() +
                    setPathClass() +
                    setBorderWallClass()
                }
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseUp={onMouseUp}
            ></div>
        );
    },
    (prevProps, nextProps) => {
        if (prevProps.cellProp === nextProps.cellProp) {
            return true;
        }
        return false;
    }
);

export default Cell;
