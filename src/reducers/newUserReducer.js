import { 
    VALID_NEW_USER,
    INPUT_ERROR
} from '../actions/actionTypes'
const initialState = {
    user : {
        first_name : "",
        last_name : "",
        sex : "",
        age : "",
        password1 : "",
        password2 : ""
    },
    validInputs: false,
    errors : {
        first_name_error : "",
        last_name_error : "",
        sex_error : "",
        age_error : "",
        password_error : ""
    }
}

const newUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case VALID_NEW_USER:
            return {...state, validInput: true};
        case INPUT_ERROR :
            return {...state, errors:{...action.errors}};
        default:
            return state;
    }
}

export default newUserReducer;