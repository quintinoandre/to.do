import { instanceToInstance } from 'class-transformer';

import { UserMapDTO } from '../dtos';
import { UserEntity } from '../entities';

class UserAdminMap {
	static toDTO({ id, name, email, roles, todos }: UserEntity): UserMapDTO {
		return instanceToInstance({ id, name, email, roles, todos });
	}
}

export { UserAdminMap };
