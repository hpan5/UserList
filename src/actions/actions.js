import axios from 'axios';
import history from '../components/history'

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
    SEARCH_USERS,
    CHANGE_USERS_NUM,
    RETORE_HOME_PAGE
} from './actionTypes';

const apiUrl = '/api/';


export const addUser = (user) => dispatch => {
    try{
        axios.post(apiUrl + 'post/', user)
        .then(response => {
            console.log(response);
        })
        .then(
            dispatch( {
                type: ADD_USER,
                payload: user
            })
        ).then(
            history.goBack()
        )
        
    }
    catch(e){
        dispatch( {
            type: ADD_USER_ERROR,
            payload: console.log(e),
        })
    }
};

export const newAddUser = (user) => {
    return dispatch => {
      return new Promise((resolve, reject) => {
          try {
            console.log("start editing user");
            axios.post(apiUrl + 'post/', user)
            .then(response => {
                console.log(response);
                dispatch( {
                    type: ADD_USER,
                    payload: user
                })
            })
            .then (
                () => {
                    dispatch(newGetUsers()).then(
                        () => {
                            //console.log("resolved after getting new users");
                            resolve();
                        }
                    );
                }
            )
          } catch(e) {
            dispatch( {
                type: EDIT_USER_ERROR,
                payload: console.log(e),
            })
          }
          
      });
    }
}


export const deleteUser = (id) => dispatch => {
    try{
        dispatch(loading());
        axios.delete(apiUrl + 'delete/' + id )
        .then(response => dispatch => {
            //console.log("user editted");
            getUsers();
            //console.log("user reloaded");
            console.log(response);
        });
        dispatch( {
            type: DELETE_USER,
            id: id
        })
    }
    catch(e){
        dispatch( {
            type: DELETE_USER_ERROR,
            payload: console.log(e),
        })
    }
};

export const editUser = (id, user, history) => dispatch => {
    try{
        //console.log("start editing user");
        axios.put(apiUrl + 'update/' + id, user)
        .then(response => dispatch => {
            getUsers();
            console.log(response);
        }).then (
            () => {
                //console.log("dispatching action");
                dispatch( {
                    type: EDIT_USER,
                    id: id
                })
            }
        ).then (
            () => {
                //console.log("after dispatch edit")
                retoreHomePage(history);
                //console.log("editted history, history going back", history.location);
            }
        )
    }
    catch(e){
        
    }
};


export const newEdit = (id, user, history) => {
    return dispatch => {
      return new Promise((resolve, reject) => {
          try {
            //console.log("start editing user");
            axios.put(apiUrl + 'update/' + id, user)
            .then(response => {
                console.log(response);
                //console.log("finished editing, sending to reducer");
                dispatch( {
                    type: EDIT_USER,
                    id: id
                })
            })
            .then (
                () => {
                    dispatch(newGetUsers()).then(
                        () => {
                            //console.log("resolved after getting new users");
                            resolve();
                        }
                    );
                }
            )
          } catch(e) {
            dispatch( {
                type: EDIT_USER_ERROR,
                payload: console.log(e),
            })
          }
          
      });
    }
}

export const newGetUsers = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            try {
                dispatch(loading());
                //console.log("getting new data");
                axios.get(apiUrl + 'posts').then((res) => {
                    //console.log("getting new data", res.data)
                    dispatch({
                        type: GET_USERS,
                        payload: res.data
                    })
                }).then (
                    () => {
                        resolve();
                    }
              )
            } catch(e) {
                dispatch( {
                    type: GET_USERS_ERROR,
                    payload: console.log(e),
                })
            }
            
        });
      }
}



export const getUsers = () => dispatch => {
    try{
        dispatch(loading());
        axios.get(apiUrl + 'posts').then((res) => {
            //console.log("getting data", res.data);
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
    }
    catch(e){
        dispatch( {
            type: GET_USERS_ERROR,
            payload: console.log(e),
        })
    }
};

export const startEdit = (id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            try {
                axios.get(apiUrl + 'get/' + id).then(response => {
                    dispatch ({
                        type: EDITING_USER,
                        editingUser: response.data
                    })
                }).then(() => {
                    resolve();
                });
            } catch(e) {
                dispatch (
                    {
                        type: GET_USERS_ERROR,
                        payload: console.log(e)
                    }
                )
            }
        })
    }
    
        
};

export const search = (value) => {
    return {
        type: SEARCH_USERS,
        value: value
    }
};

export const changeUserNum = (num) => {
    return {
        type : CHANGE_USERS_NUM,
        userNum : num
    }
}

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
    //console.log("current page " + pageNum);
    return {
        type: PAGENATION,
        pageNum: pageNum
    }
}


export const retoreHomePage = (history) => dispatch => {
    console.log("restoring history: ", history.location);
    history.goBack();
    dispatch (
        {
            type: RETORE_HOME_PAGE,
            history: history
        }
    )
}

export const loading = () => {
    return {
        type: LOADING
    }
}
