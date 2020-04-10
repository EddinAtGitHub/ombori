import React from 'react';
import {IUser} from '../interfaces/generics';
import './User.css';

interface IProps {
	userData: IUser;
}

/**
 * Single User component
 * @param {IProps} props
 * @constructor
 */
function User (props: IProps): React.ReactElement {
	const userData: IUser = props.userData;

	return (
		<div className="user-card">
			<img className="user-card-avatar" src={userData.avatar} alt={'User picture'}/>
			<div className="user-card-name">{userData.first_name + ' ' + userData.last_name}</div>
		</div>
	);
}

export default User;