import { Request } from 'express';

import { UserEntity } from '../../users/entities';

interface ILoginRequestDTO extends Request {
	user: UserEntity;
}

export { ILoginRequestDTO };
