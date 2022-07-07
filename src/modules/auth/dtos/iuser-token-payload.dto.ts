interface IUserTokenPayloadDTO {
	sub: string;
	email: string;
	name: string;
	roles: Array<string>;
	iat?: number;
	exp?: number;
}

export { IUserTokenPayloadDTO };
