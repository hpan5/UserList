import React,{Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSortedUsersList, sortSelector } from "../selectors";
import * as actionCreator from '../actions/actions';
import TableBody from './Users';
import Pagination from './Pagination';
const Button = props => {
    return (
      <button
        onClick={() => {
          props.history.push('/createUser');
        }}>
        Create New User
      </button>
    );
  };
  
const WithRouterButton = withRouter(Button);
  

class Home extends Component{
	componentDidMount(){
        this.props.onLoad();
	}
	render(){
		//console.log("sortParams", this.props.sortParams);
		return(
				<div className = 'container mt-5'>
					<table>
						<thead>
							<tr>
								<th>Edit</th>
								<th>Delete</th>
								<th onClick={() => this.props.setSortParams("first_name", this.props.sortParams.order)}>First Name</th>
								<th onClick={() => this.props.setSortParams("last_name", this.props.sortParams.order)}>Last Name</th>
								<th onClick={() => this.props.setSortParams("sex", this.props.sortParams.order)}>Sex</th>
								<th onClick={() => this.props.setSortParams("age", this.props.sortParams.order, "number")}>Age</th>
							</tr>
						</thead>
						<TableBody/>
					</table>
					{this.props.loading && <p>LOADING!!!!</p>}
					<Pagination/>
					<WithRouterButton/>
					
				</div>
			
		);
	}
}
const mapStateToProps = (state) => {
	return {
		loading: state.list.loading,
		sortParams: sortSelector(state),
		userList: getSortedUsersList(state),
		usersPerPage: state.list.usersPerPage,
		currentPage: state.list.currentPage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCreate: () => dispatch(actionCreator.addUser()),
		onLoad: () => dispatch(actionCreator.getUsers()),
		onDelete: (id) => dispatch(actionCreator.deleteUser(id)),
		setSortParams: (key, order, type = "string") => dispatch(actionCreator.setSortParams(key, order, type))
	};
}
export default connect(mapStateToProps, mapDispatchToProps) (Home);
/*
{this.props.users.map((user, i) => 
							<ul className="users" key={i}>
								<button onClick={() => this.props.onDelete(user.id)}>delete</button>
								<button>edit</button>
								<li key="fn"> {user.first_name} </li>
								<li key="ln"> {user.last_name} </li>
								<li key="se"> {user.sex} </li>
								<li key="ag"> {user.age} </li>
							</ul>
						)}
*/ 