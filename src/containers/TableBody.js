import React, { useEffect } from 'react';
import * as actionCreator from '../actions/actions'
import { getSortedUsersList} from "../selectors";
import {connect} from 'react-redux';
import '../Styles/TableBody.css';
import { withRouter, useHistory } from 'react-router-dom';
/*
f (userList) {
            filteredUserList = userList.filter((user) => (
                (user !== undefined) && (user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.sex.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.age.includes(searchTerm))
            ));
        }
*/
const TableBody = ({ userList, usersPerPage, currentPage, onDelete, startEdit, searchTerm, changeUserNum }) => {
    let history = useHistory();
    let filteredUserList = userList;
    //console.log("filteredUserList: " ,  filteredUserList);
    if (searchTerm !== "") {
        if (userList) {
            filteredUserList = userList.filter((user) => (
                (user !== undefined) && (Object.values(user).join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
            ));
            //console.log("in HomePage:" + filteredUserList.length + "");
            //changeUserNum(filteredUserList.length);
        }
    }
    //changeUserNum(filteredUserList.length);
    useEffect(() => {
        //console.log("did mount:" + filteredUserList.length);
        changeUserNum(filteredUserList.length);
    });
    
    /*let tatoalPageNum = Math.ceil(filteredUserList.length / usersPerPage);
    if (currentPage > tatoalPageNum) {
        actionCreator.paginate(tatoalPageNum);
    }*/
    let indexOfLastUser = currentPage * usersPerPage;
    let indexOfFirstUser = indexOfLastUser - usersPerPage;
    const userSlice = filteredUserList.slice(indexOfFirstUser, indexOfLastUser);
    //console.log("userSlice: " ,  userSlice);
    return (
        <tbody>
            {userSlice.map((user, i) => 
                <tr className="users" key={user.id}>
                    <td onClick={() => handleStartEditClick(startEdit, history, user.id)}> Edit</td>
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

const handleStartEditClick = (startEdit, history, id) => {
    startEdit(id).then(
        () => {
            history.push(`/editUser/${id}`);
        }
    )
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
        startEdit: (user) => dispatch(actionCreator.startEdit(user)),
        changeUserNum: (num) => dispatch(actionCreator.changeUserNum(num))
	};
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(TableBody));