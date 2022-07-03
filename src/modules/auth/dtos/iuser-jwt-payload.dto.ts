interface IUserJWTPayloadDTO {
	sub: string;
	email: string;
	name: string;
	iat?: number;
	exp?: number;
}

export { IUserJWTPayloadDTO };
