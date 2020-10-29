import React,{Component} from 'react';
import Home from '../containers/Home';
import AddNewUser from '../containers/AddNewUser';
import EditUser from '../containers/EditUser';
import {BrowserRouter as Router,  Route } from 'react-router-dom';
import history from '../components/history'

class App extends Component{
	render(){
		return (
			<Router history={history}>
			  <div>
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/createUser" component={AddNewUser} />
				<Route exact={true} path="/editUser/:id" component={EditUser} />
			  </div>
			</Router>
		);
	}
}

export default App;