import axios from 'axios';
import { get } from "lodash";

import { ADD_USER, 
    ADD_USER_ERROR,
    LOADING,
    DELETE_USER,       
    DELETE_USER_ERROR,
    EDIT_USER,
    EDIT_USER_ERROR,
    GET_USERS,     
    GET_USERS_ERROR,
    VALID_NEW_USER,
    INPUT_ERROR,
    SET_SORT_PARAMS
} from './actionTypes';

const apiUrl = 'http://localhost:8000/api/';

export const addUser = (user) => {
    console.log(user);
    return {
        type: ADD_USER,
        payload: user
    }
};

export const setSortParams = (sortKey, sortType = "string", order) => {
    //const { sortParams } = getState().app;
    //const order = get(sortParams, "order");
    return {
        type: SET_SORT_PARAMS,
        payload: {
          data: {
            key: sortKey,
            type: sortType,
            order
          }
        }
    }
};
/*
export function setSortParams(sortKey, sortType) {
    return (dispatch, getState) => {
      
      dispatch({
        type: SET_SORT_PARAMS,
        payload: {
          data: {
            key: sortKey,
            order: order === "desc" ? "asc" : "desc",
            type: sortType
          }
        }
      });
    };
  }
*/
export const deleteUser = (id) => async dispatch => {
    try{
        dispatch(loading());
        console.log(id);
        await axios.delete(apiUrl + 'delete/' + id ). then(response => {
            console.log(response);
        });
        dispatch( {
            type: DELETE_USER,
            id: id
        })
        //getUsers();
    }
    catch(e){
        dispatch( {
            type: DELETE_USER_ERROR,
            payload: console.log(e),
        })
    }
};

export const getUsers = (users) => async dispatch => {
    try{
        dispatch(loading());
        const res = await axios.get(apiUrl + 'posts' )
        console.log(res.data);
        dispatch( {
            type: GET_USERS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: GET_USERS_ERROR,
            payload: console.log(e),
        })
    }
};


export const loading = () => {
    return {
        type: LOADING
    }
}

export const validatedInput = () => {
    console.log("validated");
    return {
        type: VALID_NEW_USER
    }
}

export const createErrors = (errors) => {
    return {
        type: INPUT_ERROR,
        errors: errors
    }
}