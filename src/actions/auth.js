import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import types from "../types/types";


export const startLogin = ( email, password ) => {
    return async (dispatch) => {
        const response = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const data = await response.json();

        if(response.ok){
            localStorage.setItem('token_calendar', data.token);
            dispatch( login({ uid: data.uid, name: data.name }) );
        }else{
            const customAlert = Swal.mixin({
                background: '#fff',
                title: '#000',
                customClass: {
                    title: 'colorLoginSwal',
                    htmlContainer: 'colorLoginSwal',
                }
            });
            customAlert.fire( 'Error!', data.error, 'error' );
        }
    }
}

export const startRegister = formValues => {
    return async dispatch => {

        const response = await fetchSinToken( 'auth/new', formValues, 'POST' );
        const data = await response.json();

        if( response.ok ){
            localStorage.setItem( 'token_calendar', data.token );
            dispatch( login({ uid: data.uid, name: data.name }) );
        }else{
            Swal.mixin({
                background: '#fff',
                title: '#000',
                customClass: {
                    title: 'colorLoginSwal',
                    htmlContainer: 'colorLoginSwal',
                }
            }).fire( 'Error!', data.error, 'error' );
        }
    }
}

const login = user => ({
    type: types.AUTH_LOGIN,
    payload: user
})

export const startChecking = () => {
    return async dispatch => {
        
        const response = await fetchConToken( 'auth/renew' );
        const data = await response.json();

        if( response.ok ){
            localStorage.setItem( 'token_calendar', data.token );
            dispatch( login({ uid: data.uid, name: data.name }) );
        }else{
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({
    type: types.AUTH_CHECKIN_FINISH
})

export const startLogout = () => {
    return dispatch => {
        //borrar todo el localstorage
        localStorage.clear();
        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.AUTH_LOGOUT   
})