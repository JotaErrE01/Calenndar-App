import moment from "moment";
import types from "../types/types";

const initialState = {
    events: [{
        title: 'Cumpleaños del Jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'Jonathan'
        }
    }],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.EVENT_SET_ACTIVE:
            return {
                ...state,
                activeEvent: action.payload
            };

        case types.EVENT_ADD_NEW:
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            };
    
        default:
            return state;
    }

}