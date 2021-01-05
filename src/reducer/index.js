//Reducer: Describes how your action affects the state (data layer)
import headerState from './headerState';
import startCell from './startCell';
import finishCell from './finishCell';
import {combineReducers } from 'redux';

const allReducers = combineReducers({
    headerState,
    startCell,
    finishCell
})

export default allReducers;