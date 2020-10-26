import React, { Component } from 'react';
import UserForm from './UserForm'
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actions'
class AddNewUser extends Component {
    submit = (user) => {
        // print the form values to the console
        //this.props.addUser(user);

        let norepeat = {...user};
        delete norepeat.repeat;
        console.log("added user: " + norepeat)
        this.props.onCreate(norepeat);
        this.props.history.goBack();
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
        errors: state.newUser.errors
    }
}
const mapDispatchToProps = (dispatch) => {
	return {
        onCreate: (user) => dispatch(actionCreator.addUser(user))
	};
}

export default connect(mapStateToProps, mapDispatchToProps) (AddNewUser);