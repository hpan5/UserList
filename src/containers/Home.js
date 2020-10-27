import React,{Component} from 'react';
import '../Styles/Home.css';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSortedUsersList, sortSelector } from "../selectors";
import * as actionCreator from '../actions/actions';
import TableBody from './TableBody';
import Pagination from './Pagination';
import Search from './Seach'
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

	getClassName = (name) => {
		if (this.props.sortParams.key !== name) {
			return;
		}
		return this.props.sortParams.order;
	}

	render(){
		return(
				<div className = 'container mt-5'>
					<Search/>
					<table>
						<thead>
							<tr>
								<th>Edit</th>
								<th>Delete</th>
		
								<th onClick={() => this.props.setSortParams("first_name", this.props.sortParams.order)} id="header" className={this.getClassName("first_name")}>First Name</th>
								<th onClick={() => this.props.setSortParams("last_name", this.props.sortParams.order)} id="header" className={this.getClassName("last_name")}>Last Name</th>
								<th onClick={() => this.props.setSortParams("sex", this.props.sortParams.order)} id="header" className={this.getClassName("sex")}>Sex</th>
								<th onClick={() => this.props.setSortParams("age", this.props.sortParams.order, "number")} id="header" className={this.getClassName("age")}>Age</th>
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
		currentPage: state.list.currentPage,
		editingUser: state.list.editingUser
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
