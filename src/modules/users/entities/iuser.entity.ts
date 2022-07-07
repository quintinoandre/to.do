interface IUserEntity {
	id: string;
	name: string;
	email: string;
	password: string;
	roles: Array<string>;
}

export { IUserEntity };
