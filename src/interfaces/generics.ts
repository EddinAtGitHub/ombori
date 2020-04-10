export interface IListResponseMeta {
	total: number;
}

export interface IListResponse <T extends IEntity> extends IListResponseMeta {
	data: T[];
}

export interface IEntity {
	url: string;
}

export interface IUser extends IEntity{
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}