interface IUserFromTokenDTO {
	id: string;
	email: string;
	name: string;
	roles: Array<string>;
}

export { IUserFromTokenDTO };
