import { instanceToInstance } from 'class-transformer';

import { UserMapDTO } from '../dtos';
import { UserEntity } from '../entities';

class UserMap {
	static toDTO({ id, name, email }: UserEntity): UserMapDTO {
		return instanceToInstance({ id, name, email });
	}
}

export { UserMap };
