import React,{Component} from 'react';
import Home from './home';
import AddNewUser from './AddNewUser';
import {BrowserRouter as Router,  Route } from 'react-router-dom';
class App extends Component{
	render(){
		return (
			<Router>
			  <div>
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/createUser"  component={AddNewUser} />
			  </div>
			</Router>
		);
	}
}

export default App;