import React,{Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
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
		return(
				<div className = "App">
					
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
                        <WithRouterButton/>
						{this.props.loading && <p>LOADING!!!!</p>}
				</div>
			
		);
	}
}
const mapStateToProps = (state) => {
	return {
	  users: state.list.users,
	  loading: state.list.loading
	}
  }
  
  const mapDispatchToProps = (dispatch) => {
	return {
		onCreate: () => dispatch(actionCreator.addUser()),
		onLoad: () => dispatch(actionCreator.getUsers()),
		onDelete: (id) => dispatch(actionCreator.deleteUser(id))
	};
  
  }
export default connect(mapStateToProps, mapDispatchToProps) (Home);