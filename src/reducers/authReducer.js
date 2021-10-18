import types from "../types/types";

const initialState = {
    checking: true,
}

const authReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.AUTH_LOGIN: 
            return {
                ...state,
                ...action.payload,
                checking: false,
            }
        
        case types.AUTH_CHECKIN_FINISH:
            return{
                ...state,
                checking: false
            }

        case types.AUTH_LOGOUT:
            return{
                checking: false
            }

        default:
            return state;
    }

}

export default authReducer;