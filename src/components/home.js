import React,{Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSortedUsersList, sortSelector } from "../selectors";
import * as actionCreator from '../actions/actions';

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
		const users = this.props.users;
		console.log(users.length);
		console.log("sortParams", this.props.sortParams);
		return(
				<div className = "App">
					<table>
						<thead>
							<tr>
								<th>Edit</th>
								<th>Delete</th>
								<th onClick={() => this.props.setSortParams("first_name", this.props.sortParams.order)}>First Name</th>
								<th onClick={() => this.props.setSortParams("last_name", this.props.sortParams.order)}>Last Name</th>
								<th onClick={() => this.props.setSortParams("sex", this.props.sortParams.order)}>Sex</th>
								<th onClick={() => this.props.setSortParams("age", this.props.sortParams.order)}>Age</th>
							</tr>
							<tbody>
								{this.props.users.map((user, i) => 
									<tr className="users" key={user.id}>
										<button onClick={() => this.props.onDelete(user.id)}>delete</button>
										<button>edit</button>
										<td> {user.first_name} </td>
										<td> {user.last_name} </td>
										<td> {user.sex} </td>
										<td> {user.age} </td>
									</tr>
								)}
							</tbody>
						</thead>
					</table>
					<WithRouterButton/>
					{this.props.loading && <p>LOADING!!!!</p>}
				</div>
			
		);
	}
}
const mapStateToProps = (state) => {
	return {
		users: state.list.users,
		loading: state.list.loading,
		sortParams: sortSelector(state),
		userList: getSortedUsersList(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCreate: () => dispatch(actionCreator.addUser()),
		onLoad: () => dispatch(actionCreator.getUsers()),
		onDelete: (id) => dispatch(actionCreator.deleteUser(id)),
		setSortParams: () => dispatch(actionCreator.setSortParams())
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