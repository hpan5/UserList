import React, {useEffect} from 'react';
import UserForm from './UserForm'
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actions'
import '../Styles/AddEditUser.css'

const EditUser = (props) => {
    let id = props.match.params.id;
    useEffect(() => {
        props.startEdit(props.match.params.id);
    });
    
    const submit = (user) => {
        let norepeat = {...user};
        delete norepeat.repeat;
        props.onEdit(id, norepeat, props.history).then(() => {
            props.history.goBack();
        })
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
        onEdit: (id, user, history) => dispatch(actionCreator.newEdit(id, user, history)),
        startEdit: (id) => dispatch(actionCreator.startEdit(id)),
        onLoad: () => dispatch(actionCreator.getUsers()),
        restoreHomePage: (history) => dispatch(actionCreator.retoreHomePage(history))
	};
}
export default connect(mapStateToProps, mapDispatchToProps) (EditUser);