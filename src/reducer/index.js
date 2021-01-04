//Reducer: Describes how your action affects the state (data layer)
import headerState from './headerState';
import {combineReducers } from 'redux';

const allReducers = combineReducers({
    headerState,

})

export default allReducers;