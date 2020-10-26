import React, { useEffect } from 'react';
import UserForm from './UserForm'
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actions'

const findUserById = (users, id) => {
    for (let i = 0; i < users.length; i++){
        console.log(users[i]);
        if (users[i].id === id) {
            return users[i];
        }
    }
}

const EditUser = (props) => {
    let id = props.match.params.id;
    //console.log(id);
    let user = findUserById(props.users, id);
    //console.log("hi user: " + user);
    props.startEdit(user);
    
    const submit = (user) => {
        //props.onDelete(id);
        let norepeat = {...user};
        delete norepeat.repeat;
        //props.onCreate(norepeat);
        props.onEdit(id, norepeat);
        props.history.goBack();
    }
    return (
        <div>
            <h2>Edit User:</h2>
            <UserForm onSubmit={submit}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users : state.list.users,
        editingUser : state.list.editingUser
    }
}
const mapDispatchToProps = (dispatch) => {
	return {
        onDelete: (id) => dispatch(actionCreator.deleteUser(id)),
        onCreate: (user) => dispatch(actionCreator.addUser(user)),
        onEdit: (id, user) => dispatch(actionCreator.editUser(id, user)),
        startEdit: (user) => dispatch(actionCreator.startEdit(user))
	};
  
}
export default connect(mapStateToProps, mapDispatchToProps) (EditUser);