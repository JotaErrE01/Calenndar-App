import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from './uiReducer';

const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
    //TODO: Auth reducer
});

export default rootReducer;