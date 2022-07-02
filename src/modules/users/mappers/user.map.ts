import { instanceToInstance } from 'class-transformer';

import { IUserMapDTO } from '../dtos';
import { IUserEntity } from '../entities';

class UserMap {
	static toDTO({ id, name, email }: IUserEntity): IUserMapDTO {
		return instanceToInstance({ id, name, email });
	}
}

export { UserMap };
