import { instanceToInstance } from 'class-transformer';

import { IUserMapDTO } from '../dtos';
import { IUserEntity } from '../entities';

class UserAdminMap {
	static toDTO({ id, name, email, roles }: IUserEntity): IUserMapDTO {
		return instanceToInstance({ id, name, email, roles });
	}
}

export { UserAdminMap };
