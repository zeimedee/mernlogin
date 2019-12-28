import { GET_ERRORS,SET_CURRENT_USER,USER_LOADING} from './action_types';

const isEmpty = require("is-empty");

const initialState = {
                        isAuthenticated: false,
                        user: {},
                        loading: false

};

function rootReducer( state = initialState,action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
             };
        case USER_LOADING:
            return{
                ...state,
                loading: true
            }

        case GET_ERRORS:
            return  action.payload;

        default:
            return state;

    }

}

export default rootReducer;