import React from 'react';
import * as actionCreator from '../actions/actions'
import { getSortedUsersList} from "../selectors";
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";


const TableBody = ({ userList, usersPerPage, currentPage, onDelete, searchTerm, changeUserNum}) => {
    let history = useHistory();
    console.log(userList);
    let filteredUserList = userList;
    if (searchTerm !== "") {
        filteredUserList = userList.filter((user) => (user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || user.last_name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
    changeUserNum(filteredUserList.length);
    console.log("filteredList: " + filteredUserList);
    let indexOfLastUser = currentPage * usersPerPage;
    let indexOfFirstUser = indexOfLastUser - usersPerPage;
    const userSlice = filteredUserList.slice(indexOfFirstUser, indexOfLastUser);
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
        currentPage: state.list.currentPage,
        searchTerm : state.list.searchTerm,
        filteredUsers: state.list.filteredUsers
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        onDelete: (id) => dispatch(actionCreator.deleteUser(id)),
        onEdit: (id, user) => dispatch(actionCreator.editUser(id, user)),
        startEdit: (user) => dispatch(actionCreator.startEdit(user)),
        changeUserNum: (num) => dispatch(actionCreator.changeUserNum(num))
	};
}
export default connect(mapStateToProps, mapDispatchToProps) (TableBody);