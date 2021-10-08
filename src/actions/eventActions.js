import types from "../types/types";

export const eventAddNew = event => ({
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

export const eventUpdated = event => ({
    type: types.EVENT_UPDATED,
    payload: event
});

export const eventDeleted = () => ({
    type: types.EVENT_DELETED
});