import types from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del Jefe',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Jonathan'
//     }
// }

const initialState = {
    events: [],
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

        case types.EVENT_UNSET_ACTIVE:
            return {
                ...state,
                activeEvent: null
            };

        case types.EVENT_UPDATED:
            return {
                ...state,
                events: state.events.map( event => event._id === action.payload._id ? action.payload : event )
            };

        case types.EVENT_DELETED:
            return{
                ...state,
                events: state.events.filter( event => event._id !== state.activeEvent._id ),
                activeEvent: null
            };
        
        case types.EVENT_LOADED:
            return {
                ...state, 
                events: [ ...action.payload ]
            };

        case types.EVENTS_CLEAR: 
            return {
                ...initialState
            }
    
        default:
            return state;
    }

}