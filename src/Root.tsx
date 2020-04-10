import React from 'react';
import App from './components/app/App';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

/*
 * The Root component
*/
const Root = (): React.ReactElement => {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/" exact
						render={(): React.ReactElement => <Redirect to="/users"/>}
					/>
					<Route path="/users"
						render={(): React.ReactElement => <App/>}
					/>
				</Switch>
			</div>
		</Router>
	);
};

export default Root;