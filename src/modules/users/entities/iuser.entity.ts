import { ITodoEntity } from 'src/modules/todos/entities';

interface IUserEntity {
	id: string;
	name: string;
	email: string;
	password: string;
	roles: Array<string>;
	todos?: Array<ITodoEntity>;
}

export { IUserEntity };
