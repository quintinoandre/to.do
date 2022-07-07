interface IUserTokenPayloadDTO {
	sub: string;
	email: string;
	name: string;
	iat?: number;
	exp?: number;
}

export { IUserTokenPayloadDTO };
