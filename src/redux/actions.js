import {GET_ERRORS,USER_LOADING, SET_CURRENT_USER} from './action_types';
import axios from 'axios';
import setAuthToken from '../server/validator/setAuthToken';
import jwt_decode from 'jwt-decode';

const url='http://localhost:4000/register'


function setCurrentUser(decoded) {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

function getErrors (err) {
    return {
        type: GET_ERRORS,
        payload: err.response.data,
    }
}

//Register user
export const registeruser =(userData, history)=> dispatch =>{
    axios.post(`${url}/add`, userData)
         .then(res => history.push('/login'))
         .catch(err => 
                    dispatch(getErrors(err)))
};


// login user
 export const loginUser = userData => dispatch=>{
        axios.post(`${url}/login`, userData)
             .then(res =>{
                 //save to local storage
                 const{token} = res.data;
                 localStorage.setItem("jwtToken", token);
                 //set token to auth header
                 setAuthToken(token);
                 //decode token to get user data
                 const decoded = jwt_decode(token);
                //set current user
                dispatch(setCurrentUser(decoded));

             })
             .catch(err => dispatch(getErrors(err)))
 }


 //log out user

 export const logoutUser = () => dispatch =>{
        //remove from local storage
        localStorage.removeItem("jwtToken");
        //remove auth header for future requests
        setAuthToken(false);
        //set user object to empty object which will set is authenticated to false
        dispatch(setCurrentUser());
 }