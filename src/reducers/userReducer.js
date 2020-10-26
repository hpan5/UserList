import { startEdit } from '../actions/actions';
import { ADD_USER, 
    ADD_USER_ERROR,
    DELETE_USER,       
    DELETE_USER_ERROR,
    EDITING_USER,
    EDIT_USER,
    EDIT_USER_ERROR,
    GET_USERS,     
    GET_USERS_ERROR,
    LOADING,
    SET_SORT_PARAMS,
    PAGENATION,
    SEARCH_USERS,
    CHANGE_USERS_NUM
} from '../actions/actionTypes';

const initialState = {
    users : [],
    loading: false,
    sortParams: {
        key : "first_name",
        order : "asc",
        type : "string"
    },
    usersPerPage: 7,
    currentPage: 1,
    editingUser: undefined,
    searchTerm: "",
    filteredUsersNum: 0
    
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER : 
            return {...state, users:[...state.users, action.payload], loading:false, editingUser: undefined, filteredUsersNum : state.users.length}
        case GET_USERS : 
            //console.log(action.payload);
            return {...state, users:[...action.payload], loading:false, editingUser: undefined}
        case LOADING : 
            return {...state, loading:true}
        case DELETE_USER : 
            //console.log("deleting");
            const filteredUsers = state.users.filter(user => user.id !== action.id)
            return {...state, users: filteredUsers, loading:false, filteredUsersNum : filteredUsers.length}
        case SET_SORT_PARAMS:
            action.payload.data.order = state.sortParams.order === "desc" ? "asc" : "desc";
          return { ...state, sortParams: action.payload.data, editingUser: undefined };
        case PAGENATION:
          return { ...state, currentPage: action.pageNum };
        case EDITING_USER:
            return {...state, editingUser: action.editingUser};
        case EDIT_USER:
            return {...state, editingUser: undefined};
        case SEARCH_USERS:
            return {...state, searchTerm: action.value, loading: false}
        case CHANGE_USERS_NUM:
            return {...state, filteredUsersNum: action.userNum}
        default:
            return state;
    }
}


export default userReducer;