import { instanceToInstance } from 'class-transformer';

import { UserMapDTO } from '../dtos';
import { IUserEntity } from '../entities';

class UserAdminMap {
	static toDTO({ id, name, email, roles, todos }: IUserEntity): UserMapDTO {
		return instanceToInstance({ id, name, email, roles, todos });
	}
}

export { UserAdminMap };
