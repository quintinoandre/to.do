import { ITodoEntity } from 'src/modules/todos/entities';

interface IUserMapDTO {
	id: string;
	name: string;
	email: string;
	roles?: Array<string>;
	todos?: Array<ITodoEntity>;
}

export { IUserMapDTO };
