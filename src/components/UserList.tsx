import React, {useState} from 'react';
import {IUser, IListResponse} from '../interfaces/generics';
import User from './User';
import useApiResponse from '../hooks/useApiResponse';
import './UserList.css';
import {API_GET_USERS} from '../utils/Const';
import Loader from './common/Loader';

let users: IUser[] = [];
let total = 0;

/**
* List of Users component
* @constructor
*/
function UserList (): React.ReactElement {
	const [page, setPage] = useState<number>(1);
	const {loading, apiResponse} = useApiResponse<IListResponse<IUser>>(API_GET_USERS + `?page=${page}`);
	const [noMoreUsersToLoad, setNoMoreUsersToLoad] = useState(false);
	let content: React.ReactElement;

	users = apiResponse ? users.concat(apiResponse.data.filter((item) => !users.includes(item))) : [];
	total = apiResponse ? apiResponse.total : 0;

	const onLoadMore = (): void => {
		if (total > users.length) {
			setPage(page + 1);
		} else {
			setNoMoreUsersToLoad(true);
		}
	};

	const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
		if (
			e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
			e.currentTarget.scrollHeight
		) {
			onLoadMore();
		}
	};

	if (loading) {
		content = (
			<div>
				<Loader/>
			</div>
		);
	} else {
		const items: React.ReactNode[] = users.map((user: IUser) =>
			<User key={user.id} userData={user} />
		);
		content = (
			<div className="user-list" onScroll={e => handleScroll(e)}>
				{items}
				{noMoreUsersToLoad && (
					<div className="no-more">No more users</div>
				)}
			</div>
		);
	}

	return (
		<div>
			<div className="user-list-title">
				Users
			</div>
			{content}
		</div>
	);
}

export default UserList;