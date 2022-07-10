import { instanceToInstance } from 'class-transformer';

import { UserMapDTO } from '../dtos';
import { IUserEntity } from '../entities';

class UserMap {
	static toDTO({ id, name, email }: IUserEntity): UserMapDTO {
		return instanceToInstance({ id, name, email });
	}
}

export { UserMap };
