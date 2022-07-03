import { Request } from 'express';
import { IUserEntity } from 'src/modules/users/entities';

interface ILoginRequestDTO extends Request {
	user: IUserEntity;
}

export { ILoginRequestDTO };
