import React, {ReactNode} from 'react';
import UserList from '../../components/UserList';
import './App.css';

/**
 * Entry point component for the application
 */
class App extends React.Component {
	render (): ReactNode {
		return (
			<div>
				<UserList/>
			</div>
		);
	}
}

export default App;