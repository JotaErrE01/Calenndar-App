import { fetchConToken } from "../helpers/fetch";
import { getTypeEventsDate } from "../helpers/getTypeDateEvents";
import types from "../types/types";

export const eventStartAddNew = event => {
    return async (dispatch, getState) => {

        const user = getState().auth;

        try {
            // agreagar evento a la base de datos
        const response = await fetchConToken( 'events', event, 'POST' );
        const body = await response.json();
        const { _id } = body.newEvent;

            if(response.ok){
                dispatch( eventAddNew( { ...event, _id, user } ) );   
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventAddNew = event => ({
    type: types.EVENT_ADD_NEW,
    payload: event
});

export const eventSetActive = event => ({
    type: types.EVENT_SET_ACTIVE,
    payload: event
});

export const eventUnsetActive = () => ({
    type: types.EVENT_UNSET_ACTIVE
});

export const eventStartUpdating = event => {
    return async dispatch => {
        try {
            
            const response = await fetchConToken( `events/${ event._id }`, event, 'PUT' );
            // const data = await response.json();
            
            if(response.ok){
                dispatch( eventUpdated( event ) );
            }

        } catch (error) {
            console.log( error );
        }

    }
}

const eventUpdated = event => ({
    type: types.EVENT_UPDATED,
    payload: event
});

export const EventStartDelete = () => {
    return async ( dispatch, getState ) => {
        try {
            const { _id } = getState().calendar.activeEvent;
            const response = await fetchConToken( `events/${ _id }`, { }, 'DELETE'  );

            if(response.ok){
                dispatch( eventDeleted() );
            }

        } catch (error) {
            console.log( error );
        }
    }
}

const eventDeleted = () => ({
    type: types.EVENT_DELETED
});

export const eventStartLoading = () => {
    return async dipatch => {

        try {
            const response = await fetchConToken( 'events' );
            const { eventos } = await response.json();

            if(response.ok){
                // helper para transformar las fechas de string a date
                const eventsTrasnformed = getTypeEventsDate( eventos );
                dipatch( eventsLoaded( eventsTrasnformed ) );
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventsLoaded = events => ({
    type: types.EVENT_LOADED,
    payload: events
})

export const clearEvents = () => ({
    type: types.EVENTS_CLEAR
})