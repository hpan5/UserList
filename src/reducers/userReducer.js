import { ADD_USER, 
    ADD_USER_ERROR,
    DELETE_USER,       
    DELETE_USER_ERROR,
    EDIT_USER,
    EDIT_USER_ERROR,
    GET_USERS,     
    GET_USERS_ERROR,
    LOADING
} from '../actions/actionTypes';

const initialState = {
    users : [],
    loading: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER : 
            return {...state, users:[...state.users, action.payload], loading:false}
        case GET_USERS : 
            console.log(action.payload);
            return {...state, users:[...action.payload], loading:false}
        case LOADING : 
            return {...state, loading:true}
        case DELETE_USER : 
            console.log("deleting");
            const filteredUsers = state.users.filter(user => user.id !== action.id)
            return {...state, users: filteredUsers}
        default:
            return state;
    }
}


export default userReducer;