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
    SEARCH_USERS
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
    editingUser: {},
    searchTerm: ""
    
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER : 
            return {...state, users:[...state.users, action.payload], loading:false, editingUser: {}}
        case GET_USERS : 
            //console.log(action.payload);
            return {...state, users:[...action.payload], loading:false}
        case LOADING : 
            return {...state, loading:true}
        case DELETE_USER : 
            //console.log("deleting");
            const filteredUsers = state.users.filter(user => user.id !== action.id)
            return {...state, users: filteredUsers, loading:false}
        case SET_SORT_PARAMS:
            action.payload.data.order = state.sortParams.order === "desc" ? "asc" : "desc";
          return { ...state, sortParams: action.payload.data, editingUser: {} };
        case PAGENATION:
          return { ...state, currentPage: action.pageNum };
        case EDITING_USER:
            return {...state, editingUser: action.editingUser};
        case EDIT_USER:
            return {...state, editingUser: {}};
        case SEARCH_USERS:
            console.log("search user state: " + state.users);
            console.log("value to be searched: " + action.value)
            const searchedUsers = state.users.filter((user => 
                (user.first_name.toLowerCase().includes(action.value.toLowerCase()) || user.last_name.toLowerCase().includes(action.value.toLowerCase())))
                );
            return {...state, searchTerm: action.value, loading: false}
        default:
            return state;
    }
}


export default userReducer;