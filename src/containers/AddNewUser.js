import React, { Component } from 'react';
import UserForm from './UserForm'
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actions'
import '../Styles/AddEditUser.css'
class AddNewUser extends Component {
    submit = (user) => {
        let norepeat = {...user};
        delete norepeat.repeat;
        this.props.onCreate(norepeat);
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <h2>Add New User:</h2>
                <UserForm onSubmit={this.submit}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        onCreate: (user) => dispatch(actionCreator.addUser(user))
	};
}

export default connect(null, mapDispatchToProps) (AddNewUser);