import axios from 'axios';

import { ADD_USER, 
    ADD_USER_ERROR,
    LOADING,
    DELETE_USER,       
    DELETE_USER_ERROR,
    EDIT_USER,
    EDIT_USER_ERROR,
    GET_USERS,     
    GET_USERS_ERROR,
    SET_SORT_PARAMS,
    PAGENATION,
    EDITING_USER,
    SEARCH_USERS
} from './actionTypes';

const apiUrl = 'http://localhost:8000/api/';

export const addUser = (user) => async dispatch => {
    try{
        //console.log(user);
        await axios.post(apiUrl + 'post/', user). then(response => {
            console.log(response);
        });
        dispatch( {
            type: ADD_USER,
            payload: user
        })
    }
    catch(e){
        dispatch( {
            type: ADD_USER_ERROR,
            payload: console.log(e),
        })
    }
};

export const search = (value) => async dispatch => {
    try{
        dispatch(loading());
        const res = await axios.get(apiUrl + 'posts' )
        console.log("search users called:" + res.data);
        dispatch( {
            type: SEARCH_USERS,
            payload: res.data,
            value: value
        })
    }
    catch(e){
        dispatch( {
            type: GET_USERS_ERROR,
            payload: console.log(e),
        })
    }
};


export const setSortParams = (sortKey, order, sortType = "string") => {
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

export const paginate = (pageNum) => {
    console.log("current page " + pageNum);
    return {
        type: PAGENATION,
        pageNum: pageNum
    }
}
export const deleteUser = (id) => async dispatch => {
    try{
        dispatch(loading());
        //console.log(id);
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

export const editUser = (id, user) => async dispatch => {
    //console.log("heloooooooooooooo");
    try{
        console.log("url " + apiUrl + 'update/' + id);
        console.log("editing user : " + user);
        //await axios.post(apiUrl + 'post/', user)
        await axios.patch(apiUrl + 'update/' + id, user). then(response => {
            console.log(response);
        });
        dispatch( {
            type: EDIT_USER,
            id: id
        })
    }
    catch(e){
        dispatch( {
            type: EDIT_USER_ERROR,
            payload: console.log(e),
        })
    }
};

export const getUsers = () => async dispatch => {
    try{
        dispatch(loading());
        const res = await axios.get(apiUrl + 'posts' )
        console.log("get users called:" + res.data);
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
export const startEdit = (user) => {
    return {
        type: EDITING_USER,
        editingUser: user
    }
};