import React from 'react';
import * as actionCreator from '../actions/actions'
import { getSortedUsersList} from "../selectors";
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";


const TableBody = ({ userList, usersPerPage, currentPage, onDelete}) => {
    let history = useHistory();
    console.log(userList);
    let indexOfLastUser = currentPage * usersPerPage;
    let indexOfFirstUser = indexOfLastUser - usersPerPage;
    const userSlice = userList.slice(indexOfFirstUser, indexOfLastUser);
    return (
        <tbody>
            {userSlice.map((user, i) => 
                <tr className="users" key={user.id}>
                    <td onClick={() => history.push(`/editUser/${user.id}`)}> Edit</td>
                    <td onClick={() => onDelete(user.id)}>Delete</td>
                    <td> {user.first_name} </td>
                    <td> {user.last_name} </td>
                    <td> {user.sex} </td>
                    <td> {user.age} </td>
                </tr>
            )}
        </tbody>
    );
  }

  
const mapStateToProps = (state) => {
    return {
        userList: getSortedUsersList(state),
        usersPerPage: state.list.usersPerPage,
        currentPage: state.list.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        onDelete: (id) => dispatch(actionCreator.deleteUser(id)),
        onEdit: (id, user) => dispatch(actionCreator.editUser(id, user)),
        startEdit: (user) => dispatch(actionCreator.startEdit(user))
	};
}
export default connect(mapStateToProps, mapDispatchToProps) (TableBody);