import React,{Component} from 'react';
import Home from './Home';
import AddNewUser from './AddNewUser';
import EditUser from './EditUser';
import {BrowserRouter as Router,  Route } from 'react-router-dom';
class App extends Component{
	render(){
		return (
			<Router>
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