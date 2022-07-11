import { ITodoEntity } from '../../todos/entities';

class UserEntity {
	id: string;
	name: string;
	email: string;
	password: string;
	roles: Array<string>;
	todos?: Array<ITodoEntity>;
}

export { UserEntity };
