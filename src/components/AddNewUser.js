
import React, { Component } from 'react';
import UserForm from './NewUser'
import * as actionCreator from '../actions/actions'
class AddNewUser extends Component {
    submit = user => {
        // print the form values to the console
        //this.props.addUser(user);
        console.log(user)
    }
    render() {
        return (
            <div>
                <UserForm onSubmit={this.submit}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.newUser.user,
        validInputs: state.newUser.validInputs,
        errors: state.newUser.errors
    }
}
const mapDispatchToProps = (dispatch) => {
	return {
        validateInput: () => dispatch(actionCreator.validatedInput()),
        createErrors: (errors) => dispatch(actionCreator.createErrors(errors)),
        onCreate: (user) => dispatch(actionCreator.addUser(user))
	};
  
}
export default AddNewUser;